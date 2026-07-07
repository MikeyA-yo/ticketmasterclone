import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import MyEventsListScreen from "../components/mobile/my-events-list-screen";
import { listOrders } from "../lib/db/orders";

export const metadata: Metadata = {
  title: "My Events | Ticketmaster",
};

export default async function MyEventsPage() {
  const orders = await listOrders();
  return (
    <MobileScreen>
      <MyEventsListScreen orders={orders} />
    </MobileScreen>
  );
}
