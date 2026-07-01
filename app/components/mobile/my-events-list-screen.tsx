"use client";

import { useState } from "react";
import { orders } from "../../lib/tickets";
import EventTicketCard from "./event-ticket-card";
import FlagUS from "./flag-us";

const tabs = [
  { key: "upcoming" as const, label: "Upcoming" },
  { key: "past" as const, label: "Past" },
];

export default function MyEventsListScreen() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = orders.filter((o) => o.status === tab);

  return (
    <>
      {/* Dark header */}
      <div className="bg-black text-white">
        <div className="relative flex h-12 items-center justify-center px-4">
          <h1 className="flex items-center gap-2 text-[17px] font-semibold">
            My Events
            <FlagUS className="h-5 w-5 rounded-full ring-1 ring-white/20" />
          </h1>
          <button
            type="button"
            className="absolute right-4 text-[15px] font-semibold text-white"
          >
            Help
          </button>
        </div>

        <div className="flex">
          {tabs.map((t) => {
            const active = t.key === tab;
            const count = orders.filter((o) => o.status === t.key).length;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="relative flex-1 py-3.5 text-center text-[15px] font-bold uppercase"
              >
                <span className={active ? "text-white" : "text-white/55"}>
                  {t.label}({count})
                </span>
                {active && (
                  <span className="absolute inset-x-8 bottom-0 h-[3px] rounded-full bg-tm-blue" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 px-4 py-4">
        {list.map((order) => (
          <EventTicketCard key={order.id} order={order} />
        ))}
        {list.length === 0 && (
          <p className="py-16 text-center text-sm text-tm-ink-soft">
            No {tab} events.
          </p>
        )}
      </div>
    </>
  );
}
