"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import {
  Search,
  Heart,
  Ticket,
  Tag,
  CircleUserRound,
  type LucideProps,
} from "lucide-react";

type Tab = {
  key: string;
  label: string;
  Icon: ComponentType<LucideProps>;
  badge?: number;
};

const tabs: Tab[] = [
  { key: "discover", label: "Discover", Icon: Search },
  { key: "for-you", label: "For You", Icon: Heart },
  { key: "my-tickets", label: "My Tickets", Icon: Ticket },
  { key: "sell", label: "Sell", Icon: Tag },
  { key: "account", label: "Account", Icon: CircleUserRound, badge: 1 },
];

export default function MobileTabBar() {
  const [active, setActive] = useState("discover");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Primary"
    >
      <ul className="flex items-stretch">
        {tabs.map(({ key, label, Icon, badge }) => {
          const isActive = key === active;
          return (
            <li key={key} className="flex-1">
              <button
                type="button"
                onClick={() => setActive(key)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full flex-col items-center gap-1 py-2 ${
                  isActive ? "text-tm-blue" : "text-tm-ink-soft"
                }`}
              >
                <span className="relative">
                  <Icon className="h-6 w-6" />
                  {badge ? (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[11px] font-semibold">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
