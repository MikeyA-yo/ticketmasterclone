import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import ComingSoon from "../components/mobile/coming-soon";

export const metadata: Metadata = {
  title: "My Tickets | Ticketmaster",
};

export default function MyTicketsPage() {
  return (
    <MobileScreen title="My Tickets">
      <ComingSoon label="My Tickets" />
    </MobileScreen>
  );
}
