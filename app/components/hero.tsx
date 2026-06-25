"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Event } from "../lib/events";
import { ChevronLeft, ChevronRight, LocationIcon, CalendarIcon } from "./icons";

export default function Hero({ slides }: { slides: Event[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count]
  );

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [count, paused]);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured events"
    >
      <div className="relative h-[440px] w-full sm:h-[500px] lg:h-[560px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={{ background: slide.gradient }}
            aria-hidden={i !== index}
          >
            {/* texture + legibility scrims */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(60% 80% at 80% 20%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(50% 60% at 10% 90%, rgba(0,0,0,0.4), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

            <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-14 lg:px-6 lg:pb-20">
              {slide.badge && (
                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {slide.badge}
                </span>
              )}
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
                {slide.name}
              </h1>
              {slide.subtitle && (
                <p className="mt-3 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
                  {slide.subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-medium text-white/90">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" /> {slide.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LocationIcon className="h-4 w-4" /> {slide.venue} · {slide.city}
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="rounded-full bg-tm-blue px-7 py-3 text-base font-bold text-white shadow-lg transition hover:bg-tm-blue-dark active:scale-[0.98]">
                  Find Tickets
                </button>
                <button className="rounded-full bg-white/10 px-7 py-3 text-base font-bold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/20">
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/90 p-2.5 text-tm-ink shadow-pop transition hover:bg-white sm:grid"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full bg-white/90 p-2.5 text-tm-ink shadow-pop transition hover:bg-white sm:grid"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
