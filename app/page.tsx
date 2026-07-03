import SiteHeader from "./components/site-header";
import Hero from "./components/hero";
import CategoryTiles from "./components/category-tiles";
import EventRow from "./components/event-row";
import PromoBanner from "./components/promo-banner";
import SiteFooter from "./components/site-footer";
import MobileHeader from "./components/mobile/mobile-header";
import MobileHero from "./components/mobile/mobile-hero";
import MobileTabBar from "./components/mobile/mobile-tabbar";
import MobileRail from "./components/mobile/mobile-rail";
import RecentlyViewed from "./components/mobile/recently-viewed";
import SponsoredPresales from "./components/mobile/sponsored-presales";
import { recentlyViewed } from "./lib/events";
import { getHomeSections } from "./lib/discovery";

export default async function Home() {
  const { featured, justAnnounced, sports, forYou, presales } =
    await getHomeSections();

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

      {/* Mobile app layout (below md) — dark top chrome, light content */}
      <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col bg-tm-surface pb-24 text-tm-ink md:hidden">
        <MobileHeader />
        <main className="flex-1">
          <MobileHero slides={featured} />
          <MobileRail title="Just For You" events={forYou} />
          <RecentlyViewed items={recentlyViewed} />
          <SponsoredPresales events={presales} />
          <MobileRail title="Just Announced" events={justAnnounced} />
          <MobileRail title="Sports" events={sports} />
        </main>
        <MobileTabBar />
      </div>
    </>
  );
}
