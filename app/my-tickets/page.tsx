import type { Metadata } from "next";
import TicketDetailScreen from "../components/mobile/ticket-detail-screen";

export const metadata: Metadata = {
  title: "My Events | Ticketmaster",
};

export default function MyEventsPage() {
  return <TicketDetailScreen />;
}
