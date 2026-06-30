import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import ForYouScreen from "../components/mobile/for-you-screen";

export const metadata: Metadata = {
  title: "For You | Ticketmaster",
};

export default function ForYouPage() {
  return (
    <MobileScreen>
      <ForYouScreen />
    </MobileScreen>
  );
}
