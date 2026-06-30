"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Event } from "../../lib/events";
import { imageFor } from "../../lib/events";

export default function MobileHero({ slides }: { slides: Event[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section className="relative h-72 w-full overflow-hidden" aria-label="Featured">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ background: slide.gradient }}
          aria-hidden={i !== index}
        >
          <Image
            src={imageFor(slide)}
            alt={slide.name}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-6">
            {slide.badge && (
              <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30">
                {slide.badge}
              </span>
            )}
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow">
              {slide.name}
            </h2>
            {slide.subtitle && (
              <p className="mt-0.5 text-sm font-medium text-white/85">{slide.subtitle}</p>
            )}
            <button className="mt-3 rounded-md bg-tm-blue px-6 py-2.5 text-[15px] font-bold text-white shadow-lg transition active:scale-[0.98]">
              Find Tickets
            </button>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-2.5 right-4 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
