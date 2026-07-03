import type { TicketOrder } from "../tickets";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Email-safe HTML (table layout, inline styles) that mirrors the in-app
 * ticket detail screen: dark hero panel, blue accent bar, and the
 * Order / SECTION-ROW-SEAT cards.
 *
 * `imageSrc` is either an absolute URL / path (browser preview) or a
 * `cid:` reference to an inline attachment (real email).
 */
export function buildTicketEmailHtml(order: TicketOrder, imageSrc: string): string {
  const { event, seats, transferStatus } = order;

  const seatCards = seats
    .map(
      (s) => `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e6ea;border-radius:10px;overflow:hidden;margin-bottom:12px;">
        <tr><td style="background:#eef0f2;padding:12px 16px;font:700 14px Arial,Helvetica,sans-serif;color:#1f262d;">${escapeHtml(
          s.type,
        )}</td></tr>
        <tr><td style="padding:16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="40%" style="font:700 11px Arial,Helvetica,sans-serif;color:#6b7280;letter-spacing:.6px;">SECTION<br><span style="font:800 20px Arial,Helvetica,sans-serif;color:#1f262d;">${escapeHtml(
              s.section,
            )}</span></td>
            <td width="30%" align="center" style="font:700 11px Arial,Helvetica,sans-serif;color:#6b7280;letter-spacing:.6px;">ROW<br><span style="font:800 20px Arial,Helvetica,sans-serif;color:#1f262d;">${escapeHtml(
              s.row,
            )}</span></td>
            <td width="30%" align="right" style="font:700 11px Arial,Helvetica,sans-serif;color:#6b7280;letter-spacing:.6px;">SEAT<br><span style="font:800 20px Arial,Helvetica,sans-serif;color:#1f262d;">${escapeHtml(
              s.seat,
            )}</span></td>
          </tr></table>
        </td></tr>
      </table>`,
    )
    .join("");

  const transferRow = transferStatus
    ? `<div style="margin-top:6px;padding-top:14px;border-top:1px solid #e3e6ea;font:600 14px Arial,Helvetica,sans-serif;color:#1f262d;">&#8599;&nbsp; ${escapeHtml(
        transferStatus,
      )}</div>`
    : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(
    event.name,
  )}</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(31,38,45,.10);">
        <!-- hero image -->
        <tr><td style="background:#000000;font-size:0;line-height:0;">
          <img src="${imageSrc}" width="600" alt="${escapeHtml(
            event.name,
          )}" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
        </td></tr>
        <!-- info panel -->
        <tr><td style="background:#000000;padding:18px 22px 22px;">
          <div style="font:700 12px Arial,Helvetica,sans-serif;color:#cfd3d8;letter-spacing:1px;">${escapeHtml(
            event.date,
          )}</div>
          <div style="font:800 24px/1.15 Arial,Helvetica,sans-serif;color:#ffffff;text-transform:uppercase;margin-top:8px;">${escapeHtml(
            event.name,
          )}</div>
          <div style="height:3px;width:120px;background:#c8a24c;border-radius:2px;margin:14px 0;"></div>
          <div style="font:400 15px Arial,Helvetica,sans-serif;color:#d6d9dd;">${escapeHtml(
            event.venue,
          )} - ${escapeHtml(event.city)}</div>
        </td></tr>
        <!-- blue accent bar -->
        <tr><td style="background:#026cdf;height:10px;font-size:0;line-height:0;">&nbsp;</td></tr>
        <!-- order -->
        <tr><td style="padding:22px;">
          <div style="font:800 20px Arial,Helvetica,sans-serif;color:#1f262d;">Order</div>
          <div style="font:400 14px Arial,Helvetica,sans-serif;color:#6b7280;margin:2px 0 16px;">x${
            seats.length
          } Ticket${seats.length > 1 ? "s" : ""}</div>
          ${seatCards}
          ${transferRow}
        </td></tr>
        <!-- footer -->
        <tr><td style="padding:18px 22px;border-top:1px solid #e3e6ea;font:400 12px Arial,Helvetica,sans-serif;color:#9aa0a6;">
          This is a demo ticket confirmation from a Ticketmaster clone &mdash; not a valid ticket for entry.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function buildTicketEmailText(order: TicketOrder): string {
  const { event, seats, transferStatus } = order;
  const lines = [
    event.date,
    event.name.toUpperCase(),
    `${event.venue} - ${event.city}`,
    "",
    `Order — x${seats.length} Ticket${seats.length > 1 ? "s" : ""}`,
    ...seats.map(
      (s) => `  ${s.type}: Section ${s.section} · Row ${s.row} · Seat ${s.seat}`,
    ),
  ];
  if (transferStatus) lines.push("", transferStatus);
  lines.push("", "Demo ticket confirmation — not a valid ticket for entry.");
  return lines.join("\n");
}
