import { NextResponse, type NextRequest } from "next/server";
import { getOrder, orders } from "../../lib/tickets";
import { buildTicketEmailHtml } from "../../lib/email/ticket-email";
import { sendTicketEmail, verifyTransport } from "../../lib/email/mailer";

// GET /api/send-ticket?orderId=<id> — preview the email HTML in the browser.
// GET /api/send-ticket?check=1 — report whether SMTP env is configured (no send).
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  if (sp.has("check") || sp.has("verify")) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
    // ?verify=1 attempts a live connection + auth (no email sent)
    const connection = sp.has("verify") ? await verifyTransport() : undefined;
    return NextResponse.json({
      smtpConfigured,
      mode: smtpConfigured ? "real SMTP" : "Ethereal/offline fallback",
      host: SMTP_HOST ?? null,
      port: SMTP_PORT ?? null,
      from: SMTP_FROM ?? null,
      userSet: Boolean(SMTP_USER),
      passSet: Boolean(SMTP_PASS), // never expose the value
      connection,
    });
  }

  const id = request.nextUrl.searchParams.get("orderId") ?? orders[0].id;
  const order = getOrder(id);
  if (!order) {
    return new NextResponse("Order not found", { status: 404 });
  }
  const html = buildTicketEmailHtml(order, order.event.image);
  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// POST /api/send-ticket  { to, orderId } — send the ticket confirmation email.
export async function POST(request: NextRequest) {
  let body: { to?: string; orderId?: string } = {};
  try {
    body = await request.json();
  } catch {
    // allow empty body → defaults
  }

  const id = body.orderId ?? orders[0].id;
  const order = getOrder(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
  }

  const to = body.to?.trim() || "fan@example.com";

  try {
    const result = await sendTicketEmail(to, order);
    return NextResponse.json({ ok: true, to, orderId: id, ...result });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 },
    );
  }
}
