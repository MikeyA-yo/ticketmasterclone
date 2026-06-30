import type { Metadata } from "next";
import MobileScreen from "../components/mobile/mobile-screen";
import AccountScreen from "../components/mobile/account-screen";

export const metadata: Metadata = {
  title: "Account | Ticketmaster",
};

export default function AccountPage() {
  return (
    <MobileScreen title="Account">
      <AccountScreen />
    </MobileScreen>
  );
}
