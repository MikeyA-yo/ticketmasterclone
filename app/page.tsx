import SiteHeader from "./components/site-header";
import Hero from "./components/hero";
import CategoryTiles from "./components/category-tiles";
import EventRow from "./components/event-row";
import PromoBanner from "./components/promo-banner";
import SiteFooter from "./components/site-footer";
import MobileHeader from "./components/mobile/mobile-header";
import MobileHero from "./components/mobile/mobile-hero";
import MobileTabBar from "./components/mobile/mobile-tabbar";
import { featured, justAnnounced, sports, forYou } from "./lib/events";

export default function Home() {
  return (
    <>
      {/* Web / tablet layout (md and up) */}
      <div className="hidden flex-1 flex-col md:flex">
        <SiteHeader />
        <main className="flex-1">
          <Hero slides={featured} />
          <EventRow title="Just Announced" events={justAnnounced} />
          <CategoryTiles />
          <EventRow title="Recommended For You" events={forYou} />
          <PromoBanner />
          <EventRow title="Sports Near You" events={sports} />
        </main>
        <SiteFooter />
      </div>

      {/* Mobile app layout (below md) */}
      <div className="flex min-h-screen flex-col bg-black pb-20 text-white md:hidden">
        <MobileHeader />
        <main className="flex-1">
          <MobileHero slides={featured} />
          <EventRow title="Just For You" events={forYou} dark />
          <EventRow title="Just Announced" events={justAnnounced} dark />
          <EventRow title="Sports" events={sports} dark />
        </main>
        <MobileTabBar />
      </div>
    </>
  );
}
