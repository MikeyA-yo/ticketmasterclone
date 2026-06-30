import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import ComingSoon from "../components/mobile/coming-soon";

export const metadata: Metadata = {
  title: "Sell | Ticketmaster",
};

export default function SellPage() {
  return (
    <MobileScreen title="Sell">
      <ComingSoon label="Sell" />
    </MobileScreen>
  );
}
