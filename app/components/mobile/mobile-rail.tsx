import type { Event } from "../../lib/events";
import EventCard from "../event-card";
import { MobileSectionHeading } from "./mobile-section";

export default function MobileRail({
  title,
  events,
}: {
  title: string;
  events: Event[];
}) {
  return (
    <section className="py-6">
      <div className="px-4">
        <MobileSectionHeading
          title={title}
          action={
            <a href="#" className="shrink-0 text-sm font-bold text-tm-blue">
              See All
            </a>
          }
        />
      </div>
      <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-4 pb-1">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
