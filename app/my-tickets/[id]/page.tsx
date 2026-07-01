import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TicketDetailScreen from "../../components/mobile/ticket-detail-screen";
import { getOrder, orders } from "../../lib/tickets";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = getOrder(id);
  return { title: order ? `${order.event.name} | My Events` : "My Events" };
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  return <TicketDetailScreen order={order} />;
}
