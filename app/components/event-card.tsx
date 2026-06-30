import type { Event } from "../lib/events";
import { LocationIcon } from "./icons";

const badgeStyles: Record<NonNullable<Event["badge"]>, string> = {
  "Just Announced": "bg-tm-blue text-white",
  "Selling Fast": "bg-amber-500 text-white",
  Hot: "bg-rose-600 text-white",
  "Verified Resale": "bg-emerald-600 text-white",
  Presale: "bg-purple-600 text-white",
};

export default function EventCard({
  event,
  dark = false,
}: {
  event: Event;
  dark?: boolean;
}) {
  // Derive a short day/month chip from the date string (e.g. "Fri · Aug 14 · …")
  const parts = event.date.split("·").map((p) => p.trim());
  const dayMonth = parts.length >= 2 ? parts[1] : event.date;

  return (
    <a
      href="#"
      className={`group flex w-[230px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-pop sm:w-[260px] ${
        dark ? "border-white/10 bg-[#15171a]" : "border-tm-line bg-white"
      }`}
    >
      <div className="relative aspect-[16/10] w-full" style={{ background: event.gradient }}>
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(70% 90% at 75% 15%, rgba(255,255,255,0.6), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

        {event.badge && (
          <span
            className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[event.badge]}`}
          >
            {event.badge}
          </span>
        )}

        {/* Date chip */}
        <div className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-1 text-center leading-tight shadow">
          <span className="block text-[11px] font-bold uppercase text-tm-ink">{dayMonth}</span>
        </div>

        <h3 className="absolute inset-x-3 bottom-3 text-lg font-extrabold leading-tight text-white drop-shadow">
          {event.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        {event.subtitle && (
          <p
            className={`line-clamp-1 text-sm font-medium ${
              dark ? "text-white" : "text-tm-ink"
            }`}
          >
            {event.subtitle}
          </p>
        )}
        <p className={`text-sm ${dark ? "text-white/60" : "text-tm-ink-soft"}`}>
          {event.date}
        </p>
        <p
          className={`mt-1 flex items-start gap-1 text-sm ${
            dark ? "text-white/60" : "text-tm-ink-soft"
          }`}
        >
          <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
          <span className="line-clamp-1">
            {event.venue} · {event.city}
          </span>
        </p>
        <span className="mt-2 inline-block text-sm font-bold text-tm-blue group-hover:underline">
          Find Tickets
        </span>
      </div>
    </a>
  );
}
