"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { RecentItem } from "../../lib/events";
import { MobileSectionHeading } from "./mobile-section";

export default function RecentlyViewed({ items }: { items: RecentItem[] }) {
  const [list, setList] = useState(items);

  if (list.length === 0) return null;

  return (
    <section className="px-4 py-6">
      <MobileSectionHeading title="Recently Viewed" />
      <div className="flex flex-col gap-3">
        {list.map((item) => (
          <a
            key={item.id}
            href="#"
            className="flex items-center gap-3 rounded-full border border-tm-line bg-white py-2.5 pl-2.5 pr-3 shadow-sm transition active:scale-[0.99]"
          >
            <span
              className="h-9 w-9 shrink-0 rounded-full ring-1 ring-black/5"
              style={{ background: item.gradient }}
              aria-hidden
            />
            <span className="flex-1 truncate text-[17px] font-semibold text-tm-ink">
              {item.name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setList((cur) => cur.filter((i) => i.id !== item.id));
              }}
              aria-label={`Remove ${item.name}`}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-tm-line text-tm-ink-soft transition hover:bg-tm-surface"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </a>
        ))}
      </div>
    </section>
  );
}
