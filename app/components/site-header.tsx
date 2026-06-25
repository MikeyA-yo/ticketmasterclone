"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { categories, cities } from "../lib/events";
import {
  SearchIcon,
  LocationIcon,
  UserIcon,
  HeartIcon,
  ChevronDown,
  MenuIcon,
  CloseIcon,
} from "./icons";

export default function SiteHeader() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(cities[0]);
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-tm-line">
      {/* Top row: logo · search · actions */}
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden -ml-1 grid h-10 w-10 place-items-center rounded-md text-tm-ink hover:bg-tm-surface"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Search */}
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="relative ml-1 hidden flex-1 items-center md:flex"
        >
          <SearchIcon className="pointer-events-none absolute left-3.5 h-5 w-5 text-tm-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Artist, Event or Venue"
            className="h-11 w-full rounded-full border border-tm-line bg-tm-surface pl-11 pr-4 text-[15px] text-tm-ink placeholder:text-tm-ink-soft outline-none transition focus:border-tm-blue focus:bg-white focus:ring-2 focus:ring-tm-blue/20"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* City selector */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setCityOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-tm-ink hover:bg-tm-surface"
              aria-haspopup="listbox"
              aria-expanded={cityOpen}
            >
              <LocationIcon className="h-5 w-5 text-tm-blue" />
              <span className="hidden lg:inline max-w-[9rem] truncate">{city}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {cityOpen && (
              <ul
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-tm-line bg-white py-1 shadow-pop"
                role="listbox"
              >
                {cities.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setCityOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-tm-surface ${
                        c === city ? "font-semibold text-tm-blue" : "text-tm-ink"
                      }`}
                      role="option"
                      aria-selected={c === city}
                    >
                      <LocationIcon className="h-4 w-4 opacity-60" />
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-tm-ink hover:bg-tm-surface"
            aria-label="Favorites"
          >
            <HeartIcon className="h-6 w-6" />
          </button>

          <Link
            href="/sign-in"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-tm-ink hover:bg-tm-surface"
          >
            <UserIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Sign In / Register</span>
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative flex items-center">
          <SearchIcon className="pointer-events-none absolute left-3.5 h-5 w-5 text-tm-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Artist, Event or Venue"
            className="h-11 w-full rounded-full border border-tm-line bg-tm-surface pl-11 pr-4 text-[15px] text-tm-ink placeholder:text-tm-ink-soft outline-none focus:border-tm-blue focus:bg-white"
          />
        </div>
      </div>

      {/* Category nav row (desktop) */}
      <nav className="hidden border-t border-tm-line lg:block">
        <ul className="mx-auto flex max-w-[1320px] items-center gap-1 px-4 lg:px-6">
          {categories.map((cat) => (
            <li key={cat.key}>
              <Link
                href={`/${cat.key}`}
                className="group relative flex h-11 items-center px-4 text-sm font-semibold text-tm-ink"
              >
                {cat.label}
                <span className="absolute inset-x-3 bottom-0 h-0.5 origin-left scale-x-0 bg-tm-blue transition-transform group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link
              href="/more"
              className="flex h-11 items-center gap-1 px-4 text-sm font-semibold text-tm-ink hover:text-tm-blue"
            >
              More <ChevronDown className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile slide-down nav */}
      {menuOpen && (
        <nav className="border-t border-tm-line lg:hidden">
          <ul className="mx-auto max-w-[1320px] px-2 py-2">
            {categories.map((cat) => (
              <li key={cat.key}>
                <Link
                  href={`/${cat.key}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-tm-ink hover:bg-tm-surface"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-tm-line pt-1">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-tm-ink hover:bg-tm-surface"
              >
                <LocationIcon className="h-5 w-5 text-tm-blue" /> {city}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
