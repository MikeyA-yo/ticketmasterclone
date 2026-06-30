"use client";

import { useRef } from "react";
import type { Event } from "../lib/events";
import EventCard from "./event-card";
import { ChevronLeft, ChevronRight } from "./icons";

type Props = {
  title: string;
  events: Event[];
  seeAllHref?: string;
  dark?: boolean;
};

export default function EventRow({ title, events, seeAllHref = "#", dark = false }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-7 lg:px-6">
      <div className="mb-4 flex items-end justify-between">
        <h2
          className={`text-2xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-tm-ink"
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <a
            href={seeAllHref}
            className="text-sm font-bold text-tm-blue hover:underline"
          >
            See All
          </a>
          <div className="hidden gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                dark
                  ? "border-white/25 text-white hover:border-white"
                  : "border-tm-line text-tm-ink hover:border-tm-blue hover:text-tm-blue"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                dark
                  ? "border-white/25 text-white hover:border-white"
                  : "border-tm-line text-tm-ink hover:border-tm-blue hover:text-tm-blue"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 pb-2"
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} dark={dark} />
        ))}
      </div>
    </section>
  );
}
