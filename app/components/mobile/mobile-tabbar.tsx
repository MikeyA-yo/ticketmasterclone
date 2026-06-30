"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  href: string;
  label: string;
  Icon: ComponentType<LucideProps>;
  badge?: number;
  /** fill the icon when this tab is active (e.g. the heart) */
  activeFill?: boolean;
};

const tabs: Tab[] = [
  { href: "/", label: "Discover", Icon: Search },
  { href: "/for-you", label: "For You", Icon: Heart, activeFill: true },
  { href: "/my-tickets", label: "My Tickets", Icon: Ticket },
  { href: "/sell", label: "Sell", Icon: Tag },
  { href: "/account", label: "Account", Icon: CircleUserRound, badge: 1, activeFill: true },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[600px] -translate-x-1/2 border-t border-black/5 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      aria-label="Primary"
    >
      <ul className="flex items-stretch">
        {tabs.map(({ href, label, Icon, badge, activeFill }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full flex-col items-center gap-1 py-2 ${
                  isActive ? "text-tm-blue" : "text-tm-ink-soft"
                }`}
              >
                <span className="relative">
                  <Icon
                    className="h-6 w-6"
                    fill={isActive && activeFill ? "currentColor" : "none"}
                  />
                  {badge ? (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[11px] font-semibold">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
