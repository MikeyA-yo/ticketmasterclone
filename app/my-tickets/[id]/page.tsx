import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TicketDetailScreen from "../../components/mobile/ticket-detail-screen";
import { getOrderById, listOrders } from "../../lib/db/orders";

export async function generateStaticParams() {
  const orders = await listOrders();
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = await getOrderById(id);
  return { title: order ? `${order.event.name} | My Events` : "My Events" };
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();
  return <TicketDetailScreen order={order} />;
}
