import path from "node:path";
import { promises as fs } from "node:fs";
import nodemailer, { type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { TicketOrder } from "../tickets";
import { buildTicketEmailHtml, buildTicketEmailText } from "./ticket-email";

let transporterPromise: Promise<Transporter> | null = null;

async function createTransporter(): Promise<Transporter> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  // Real SMTP when configured via env (e.g. Gmail, SendGrid, Mailgun, SES…)
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT) || 587;
    const options: SMTPTransport.Options & { family?: number } = {
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      family: 4, // force IPv4 — many machines have no IPv6 route (ENETUNREACH)
      // fail fast instead of hanging ~2min if outbound SMTP is blocked
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    };
    return nodemailer.createTransport(options);
  }

  // Dev fallback: Ethereal test inbox. Nothing is delivered to a real
  // address — sendMail returns a preview URL you can open in the browser.
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

function getTransporter(): Promise<Transporter> {
  if (!transporterPromise) transporterPromise = createTransporter();
  return transporterPromise;
}

/** Test the SMTP connection + auth without sending an email. */
export async function verifyTransport(): Promise<{ ok: boolean; error?: string }> {
  try {
    const transporter = await getTransporter();
    await transporter.verify();
    return { ok: true };
  } catch (err) {
    transporterPromise = null; // allow a later retry
    return { ok: false, error: err instanceof Error ? err.message : "verify failed" };
  }
}

export type SendResult = {
  transport: "smtp" | "ethereal" | "stream";
  messageId: string;
  /** Ethereal preview URL when using the dev fallback, else null */
  previewUrl: string | null;
  /** Path to the saved .eml when the offline fallback was used, else null */
  savedTo: string | null;
  usingTestAccount: boolean;
  note?: string;
};

// Assemble the full .eml locally without sending (used as an offline fallback
// so the message is still produced when outbound SMTP is unavailable).
async function writeEmlToDisk(message: nodemailer.SendMailOptions): Promise<string> {
  const stream = nodemailer.createTransport({ streamTransport: true, buffer: true });
  const info = await stream.sendMail(message);
  const dir = path.join(process.cwd(), ".mail-outbox");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `ticket-${Date.now()}.eml`);
  await fs.writeFile(file, info.message as Buffer);
  return file;
}

export async function sendTicketEmail(
  to: string,
  order: TicketOrder,
): Promise<SendResult> {
  const usingTestAccount = !(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  // Embed the event image inline (cid) so the email is self-contained.
  const attachments: { filename: string; content: Buffer; cid: string }[] = [];
  let imageSrc = order.event.image;
  try {
    const imageAbsPath = path.join(process.cwd(), "public", order.event.image);
    const content = await fs.readFile(imageAbsPath);
    attachments.push({
      filename: path.basename(imageAbsPath),
      content,
      cid: "eventImage",
    });
    imageSrc = "cid:eventImage";
  } catch {
    // Image not readable — fall back to the path/URL in the template.
  }

  const message: nodemailer.SendMailOptions = {
    from: process.env.SMTP_FROM || '"Ticketmaster" <tickets@ticketmaster.demo>',
    to,
    subject: `Your tickets: ${order.event.name}`,
    text: buildTicketEmailText(order),
    html: buildTicketEmailHtml(order, imageSrc),
    attachments,
  };

  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail(message);
    return {
      transport: usingTestAccount ? "ethereal" : "smtp",
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) || null,
      savedTo: null,
      usingTestAccount,
    };
  } catch (err) {
    // With real SMTP configured, surface the failure. In dev (no SMTP creds)
    // — e.g. when outbound SMTP is blocked — save the assembled .eml instead.
    if (!usingTestAccount) throw err;
    transporterPromise = null; // reset so a later attempt can retry the network
    const savedTo = await writeEmlToDisk(message);
    return {
      transport: "stream",
      messageId: `local:${path.basename(savedTo)}`,
      previewUrl: null,
      savedTo,
      usingTestAccount,
      note: `Outbound SMTP unavailable (${
        err instanceof Error ? err.message : "network error"
      }); wrote .eml to disk instead.`,
    };
  }
}
