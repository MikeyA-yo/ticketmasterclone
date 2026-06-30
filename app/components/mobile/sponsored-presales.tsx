"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { MapPin, ChevronDown, ChevronLeft, ArrowRight } from "lucide-react";
import type { Event } from "../../lib/events";
import { imageFor } from "../../lib/events";
import { MobileSectionHeading } from "./mobile-section";

export default function SponsoredPresales({
  events,
  city = "Los Angeles, CA",
}: {
  events: Event[];
  city?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="px-4 py-6">
      <MobileSectionHeading title="Sponsored Presales and Offers" />

      <div className="mb-4 flex items-center gap-2 text-[17px]">
        <MapPin className="h-5 w-5 text-tm-ink" />
        <span className="font-semibold text-tm-ink">Near</span>
        <button
          type="button"
          className="flex items-center gap-0.5 font-semibold text-tm-blue underline underline-offset-2"
        >
          {city}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {events.map((ev) => (
              <div key={ev.id} className="min-w-0 flex-[0_0_100%]">
                <div className="relative h-56 w-full" style={{ background: ev.gradient }}>
                  <Image
                    src={imageFor(ev)}
                    alt={ev.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-purple-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Presale
                  </span>
                </div>

                <div className="pt-3">
                  <p className="text-[15px] text-tm-ink-soft">{ev.date}</p>
                  <a
                    href="#"
                    className="mt-0.5 block text-xl font-extrabold leading-snug text-tm-blue underline underline-offset-2"
                  >
                    {ev.name}
                    {ev.subtitle ? ` - ${ev.subtitle}` : ""}
                  </a>
                  <p className="mt-0.5 text-[15px] text-tm-ink-soft">
                    {ev.city} · {ev.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls — vertically centered over the image (h-56 → 7rem) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-28 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-tm-ink shadow-pop transition active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-28 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-lg bg-tm-blue text-white shadow-pop transition hover:bg-tm-blue-dark active:scale-95"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
