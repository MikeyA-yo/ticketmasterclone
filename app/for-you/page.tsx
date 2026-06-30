import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import ComingSoon from "../components/mobile/coming-soon";

export const metadata: Metadata = {
  title: "For You | Ticketmaster",
};

export default function ForYouPage() {
  return (
    <MobileScreen title="For You">
      <ComingSoon label="For You" />
    </MobileScreen>
  );
}
