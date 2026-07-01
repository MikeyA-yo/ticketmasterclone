import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import MyEventsListScreen from "../components/mobile/my-events-list-screen";

export const metadata: Metadata = {
  title: "My Events | Ticketmaster",
};

export default function MyEventsPage() {
  return (
    <MobileScreen>
      <MyEventsListScreen />
    </MobileScreen>
  );
}
