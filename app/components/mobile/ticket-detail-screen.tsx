"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Tickets,
  EllipsisVertical,
  ArrowUpRight,
  RefreshCw,
  Wallet,
  Info,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import { type Seat, type TicketOrder } from "../../lib/tickets";
import EmailTicket from "./email-ticket";

function SeatCard({ seat }: { seat: Seat }) {
  return (
    <div className="overflow-hidden rounded-lg border border-tm-line bg-white">
      <div className="bg-tm-surface-2 px-4 py-3 text-[15px] font-bold text-tm-ink">
        {seat.type}
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-tm-ink-soft">
            Section
          </p>
          <p className="mt-1 text-xl font-extrabold text-tm-ink">{seat.section}</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-wide text-tm-ink-soft">
            Row
          </p>
          <p className="mt-1 text-xl font-extrabold text-tm-ink">{seat.row}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold uppercase tracking-wide text-tm-ink-soft">
            Seat
          </p>
          <p className="mt-1 text-xl font-extrabold text-tm-ink">{seat.seat}</p>
        </div>
      </div>
    </div>
  );
}

function OptionRow({ icon: Icon, label }: { icon: ComponentType<LucideProps>; label: string }) {
  return (
    <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-black/[0.03]">
      <Icon className="h-5 w-5 shrink-0 text-tm-ink" strokeWidth={1.75} />
      <span className="text-[15px] font-medium text-tm-ink">{label}</span>
    </button>
  );
}

export default function TicketDetailScreen({ order }: { order: TicketOrder }) {
  const router = useRouter();
  const [tab, setTab] = useState<"tickets" | "extras">("tickets");
  const { event, seats, transferStatus } = order;

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/my-tickets");
  };

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[600px] bg-tm-surface pb-28 text-tm-ink">
      {/* Hero */}
      <div className="relative h-[320px] w-full bg-black">
        <Image
          src={event.image}
          alt={event.name}
          fill
          priority
          sizes="(max-width: 600px) 100vw, 600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />

        <button
          type="button"
          onClick={goBack}
          aria-label="Back"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
        >
          Help
        </button>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <p className="text-xs font-bold uppercase tracking-wide text-white/90">
            {event.date}
          </p>
          <h1 className="mt-1.5 text-2xl font-extrabold uppercase leading-tight text-white">
            {event.name}
          </h1>
          <div className="mt-2.5 flex items-end justify-between gap-3">
            <p className="text-[15px] text-white/85">
              {event.venue}, {event.city}
            </p>
            <span className="flex shrink-0 items-center gap-1.5 text-white">
              <Tickets className="h-5 w-5" />
              <span className="font-bold">{event.count}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Blue accent bar */}
      <div className="h-9 w-full bg-tm-blue" />

      {/* Tabs */}
      <div className="flex border-b border-tm-line bg-white">
        {(["tickets", "extras"] as const).map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="relative flex-1 py-4 text-center text-[15px] font-bold capitalize"
            >
              <span className={active ? "text-tm-ink" : "text-tm-ink-soft"}>{t}</span>
              {active && (
                <span className="absolute inset-x-6 -bottom-px h-[3px] rounded-full bg-tm-ink" />
              )}
            </button>
          );
        })}
      </div>

      {tab === "tickets" ? (
        <div className="px-4 py-5">
          {/* Order header */}
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-tm-ink">Order</h2>
              <p className="text-sm text-tm-ink-soft">x{seats.length} Tickets</p>
            </div>
            <button type="button" aria-label="Order options" className="p-1 text-tm-ink">
              <EllipsisVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Seat cards */}
          <div className="space-y-3">
            {seats.map((seat, i) => (
              <SeatCard key={i} seat={seat} />
            ))}
          </div>

          {/* Transfer status */}
          {transferStatus && (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-tm-line bg-white px-4 py-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-tm-line text-tm-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="truncate text-[15px] font-semibold text-tm-ink-soft">
                {transferStatus}: 1 ticket transferred
              </span>
            </div>
          )}

          {/* More options */}
          <h3 className="mb-2 mt-7 text-sm font-bold uppercase tracking-wide text-tm-ink-soft">
            More Options
          </h3>
          <div className="divide-y divide-tm-line overflow-hidden rounded-lg border border-tm-line bg-white">
            <EmailTicket orderId={order.id} />
            <OptionRow icon={Wallet} label="Add to Apple Wallet" />
            <OptionRow icon={Info} label="View Event Details" />
          </div>
        </div>
      ) : (
        <div className="px-4 py-20 text-center text-sm text-tm-ink-soft">
          No extras available for this event.
        </div>
      )}

      {/* Floating action bar */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center rounded-full bg-white px-1.5 py-2 shadow-pop ring-1 ring-black/5">
          <button type="button" className="flex flex-col items-center gap-0.5 px-7 text-tm-blue">
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xs font-semibold">Transfer</span>
          </button>
          <span className="h-9 w-px bg-tm-line" />
          <button type="button" className="flex flex-col items-center gap-0.5 px-7 text-tm-blue">
            <RefreshCw className="h-5 w-5" />
            <span className="text-xs font-semibold">Sell</span>
          </button>
        </div>
      </div>
    </div>
  );
}
