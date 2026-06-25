import SiteHeader from "./components/site-header";
import Hero from "./components/hero";
import CategoryTiles from "./components/category-tiles";
import EventRow from "./components/event-row";
import PromoBanner from "./components/promo-banner";
import SiteFooter from "./components/site-footer";
import { featured, justAnnounced, sports, forYou } from "./lib/events";

export default function Home() {
  return (
    <>
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
    </>
  );
}
