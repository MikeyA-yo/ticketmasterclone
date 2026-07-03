import { NextResponse, type NextRequest } from "next/server";
import { getOrder, orders } from "../../lib/tickets";
import { buildTicketEmailHtml } from "../../lib/email/ticket-email";
import { sendTicketEmail } from "../../lib/email/mailer";

// GET /api/send-ticket?orderId=<id> — preview the email HTML in the browser.
export async function GET(request: NextRequest) {
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
