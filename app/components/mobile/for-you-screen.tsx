"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";
import {
  performers,
  musicGenres,
  type PerformerCategory,
} from "../../lib/performers";

const tabs: { key: "all" | PerformerCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "music", label: "Music" },
  { key: "sports", label: "Sports" },
  { key: "arts", label: "Arts & Theatre" },
];

export default function ForYouScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | PerformerCategory>("music");
  const [genre, setGenre] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const showGenres = tab === "music" || tab === "all";

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return performers.filter((p) => {
      if (tab !== "all" && p.category !== tab) return false;
      if (showGenres && genre && p.genre !== genre) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tab, genre, query, showGenres]);

  return (
    <>
      {/* Dark header */}
      <div className="bg-zinc-900 text-white">
        <div className="relative flex h-12 items-center justify-center px-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="absolute left-1 grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-[17px] font-semibold">Find Your Favorites</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3.5 py-3">
            <Search className="h-5 w-5 shrink-0 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search performers, teams, or venues"
              className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/55"
            />
          </div>
        </div>

        {/* Segment tabs */}
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-4">
          {tabs.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setTab(t.key);
                  setGenre(null);
                }}
                className="relative shrink-0 whitespace-nowrap pb-3 pt-1 text-[15px] font-semibold"
              >
                <span className={active ? "text-white" : "text-white/60"}>
                  {t.label}
                </span>
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-tm-blue" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre pills */}
      {showGenres && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-3.5">
          {musicGenres.map((g) => {
            const active = g === genre;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGenre(active ? null : g)}
                className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-tm-blue text-white"
                    : "bg-tm-surface-2 text-tm-ink hover:bg-tm-line"
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 px-4 pt-1 pb-4">
        {list.map((p) => (
          <a
            key={p.id}
            href="#"
            className="flex flex-col overflow-hidden rounded-xl border border-tm-line bg-white p-1.5 shadow-sm transition active:scale-[0.98]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-tm-surface-2">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 600px) 33vw, 190px"
                className="object-cover"
              />
            </div>
            <span className="line-clamp-2 px-1 py-2 text-center text-[13px] font-semibold leading-tight text-tm-ink">
              {p.name}
            </span>
          </a>
        ))}
      </div>

      {list.length === 0 && (
        <p className="px-4 py-10 text-center text-sm text-tm-ink-soft">
          No results — try another search or filter.
        </p>
      )}
    </>
  );
}
