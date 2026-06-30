"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../logo";
import {
  SearchIcon,
  LocationIcon,
  CalendarIcon,
  ChevronDown,
  BackspaceIcon,
} from "../icons";

const pills = [
  { label: "Concerts", href: "/concerts" },
  { label: "Sports", href: "/sports" },
  { label: "Arts, Theater & Comedy", href: "/arts-theater" },
  { label: "Family", href: "/family" },
  { label: "Cities", href: "/cities" },
];

function FlagUS() {
  return (
    <svg
      viewBox="0 0 24 16"
      aria-label="United States"
      className="h-5 w-7 overflow-hidden rounded-[3px] ring-1 ring-white/30"
    >
      <rect width="24" height="16" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.85" width="24" height="1.23" />
        <rect y="4.31" width="24" height="1.23" />
        <rect y="6.77" width="24" height="1.23" />
        <rect y="9.23" width="24" height="1.23" />
        <rect y="11.69" width="24" height="1.23" />
        <rect y="14.15" width="24" height="1.23" />
      </g>
      <rect width="10.5" height="8.62" fill="#3C3B6E" />
    </svg>
  );
}

export default function MobileHeader() {
  const [location, setLocation] = useState("Los Angeles, CA");
  const [query, setQuery] = useState("");

  return (
    <div className="bg-black px-4 pt-3 pb-3 text-white">
      {/* Logo row */}
      <div className="relative flex h-9 items-center justify-center">
        <Link href="/">
          <Logo variant="white" withIcon={false} />
        </Link>
        <button type="button" className="absolute right-0" aria-label="Region">
          <FlagUS />
        </button>
      </div>

      {/* Location + Dates */}
      <div className="mt-3 flex items-stretch">
        <div className="flex flex-1 items-center gap-2.5">
          <LocationIcon className="h-5 w-5 shrink-0 text-white" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-white/55">
              Location
            </p>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full truncate bg-transparent text-[15px] font-medium text-white outline-none"
            />
          </div>
          {location && (
            <button
              type="button"
              onClick={() => setLocation("")}
              aria-label="Clear location"
              className="shrink-0 text-white/60 hover:text-white"
            >
              <BackspaceIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mx-3 w-px self-stretch bg-white/20" />

        <button type="button" className="flex items-center gap-2.5 text-left">
          <CalendarIcon className="h-5 w-5 shrink-0 text-white" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-white/55">
              Dates
            </p>
            <p className="text-[15px] font-medium text-white">All Dates</p>
          </div>
          <ChevronDown className="h-5 w-5 text-white/70" />
        </button>
      </div>

      {/* Search bar */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="mt-3 flex items-center gap-3 rounded-lg bg-white px-4 py-2.5"
      >
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wide text-tm-ink-soft">
            Search
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artist, Event or Venue"
            className="w-full bg-transparent text-[15px] text-tm-ink outline-none placeholder:text-tm-ink-soft"
          />
        </span>
        <SearchIcon className="h-6 w-6 shrink-0 text-tm-blue" />
      </form>

      {/* Category pills */}
      <div className="no-scrollbar -mx-4 mt-3.5 flex gap-3 overflow-x-auto px-4 pb-0.5">
        {pills.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="shrink-0 whitespace-nowrap rounded-md border border-white/35 px-4 py-2 text-[15px] font-bold text-white transition hover:bg-white/10"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
