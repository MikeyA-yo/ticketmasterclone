"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import {
  SearchIcon,
  LocationIcon,
  UserIcon,
  CalendarIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon,
} from "./icons";

const navItems = [
  { label: "Concerts", href: "/concerts" },
  { label: "Sports", href: "/sports" },
  { label: "Arts, Theater & Comedy", href: "/arts-theater" },
  { label: "Family", href: "/family" },
  { label: "Cities", href: "/cities" },
];

const utilityLinks = ["Hotels", "Sell", "Gift Cards", "Help", "VIP"];

export default function SiteHeader() {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const segLabel =
    "text-[11px] font-bold uppercase tracking-wide text-tm-ink-soft";

  return (
    <header>
      {/* Black utility bar */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-4 text-[13px] lg:px-6">
          <button
            type="button"
            className="flex items-center gap-1.5 font-semibold hover:text-white/80"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[9px] font-bold">
              US
            </span>
            US
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <nav className="flex items-center gap-4 sm:gap-5">
            {utilityLinks.map((l) => (
              <Link key={l} href="#" className="hover:underline">
                {l}
              </Link>
            ))}
            <span className="ml-1 hidden items-center gap-1.5 border-l border-white/20 pl-4 sm:flex">
              <span className="font-bold italic">PayPal</span>
              <span className="text-[9px] leading-[1.1] text-white/60">
                Preferred
                <br />
                Payments Partner
              </span>
            </span>
          </nav>
        </div>
      </div>

      {/* Blue band: nav + search */}
      <div className="bg-tm-blue-dark text-white">
        {/* Top row */}
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="-ml-1 grid h-10 w-10 place-items-center rounded-md text-white hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <Link href="/" className="shrink-0">
            <Logo variant="white" withIcon={false} registered />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold text-white/95 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/sign-in"
            className="ml-auto flex items-center gap-2 text-sm font-bold text-white hover:text-white/85"
          >
            <UserIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Sign In/Register</span>
          </Link>
        </div>

        {/* Search */}
        <div className="mx-auto max-w-[1320px] px-4 pb-6 lg:px-6">
          {/* Desktop: segmented search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="hidden overflow-hidden rounded-lg bg-white shadow-card md:flex"
          >
            <label className="flex flex-1 items-center gap-3 border-r border-tm-line px-4 py-2.5">
              <LocationIcon className="h-5 w-5 shrink-0 text-tm-blue" />
              <span className="flex w-full flex-col">
                <span className={segLabel}>Location</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or Zip Code"
                  className="w-full bg-transparent text-sm text-tm-ink outline-none placeholder:text-tm-ink-soft"
                />
              </span>
            </label>

            <label className="flex items-center gap-3 border-r border-tm-line px-4 py-2.5">
              <CalendarIcon className="h-5 w-5 shrink-0 text-tm-blue" />
              <span className="flex flex-col">
                <span className={segLabel}>Dates</span>
                <select
                  className="bg-transparent text-sm text-tm-ink outline-none"
                  defaultValue="all"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="weekend">This Weekend</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </span>
            </label>

            <label className="flex flex-[1.6] items-center gap-3 px-4 py-2.5">
              <SearchIcon className="h-5 w-5 shrink-0 text-tm-blue" />
              <span className="flex w-full flex-col">
                <span className={segLabel}>Search</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Artist, Event or Venue"
                  className="w-full bg-transparent text-sm text-tm-ink outline-none placeholder:text-tm-ink-soft"
                />
              </span>
            </label>

            <button
              type="submit"
              className="m-1.5 rounded-md bg-tm-blue-dark px-8 text-sm font-bold text-white transition hover:bg-tm-blue-darker"
            >
              Search
            </button>
          </form>

          {/* Mobile: single search pill */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative flex items-center md:hidden"
          >
            <SearchIcon className="pointer-events-none absolute left-3.5 h-5 w-5 text-tm-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Artist, Event or Venue"
              className="h-11 w-full rounded-full bg-white pl-11 pr-4 text-[15px] text-tm-ink outline-none placeholder:text-tm-ink-soft"
            />
          </form>
        </div>

        {/* Mobile slide-down nav */}
        {menuOpen && (
          <nav className="border-t border-white/15 md:hidden">
            <ul className="mx-auto max-w-[1320px] px-2 py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-bold text-white hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
