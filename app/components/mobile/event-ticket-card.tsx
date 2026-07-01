import Link from "next/link";
import Image from "next/image";
import type { TicketOrder } from "../../lib/tickets";

export default function EventTicketCard({ order }: { order: TicketOrder }) {
  const { event } = order;
  return (
    <Link
      href={`/my-tickets/${order.id}`}
      className="block overflow-hidden rounded-xl shadow-card transition active:scale-[0.99]"
    >
      <div className="relative h-52 w-full bg-black">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      </div>
      <div className="bg-black px-5 pb-5 pt-3 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-white/90">
          {event.date}
        </p>
        <h3 className="mt-1.5 text-2xl font-extrabold uppercase leading-tight">
          {event.name}
        </h3>
        <div className="my-3 h-0.5 w-3/5 rounded-full bg-[#c8a24c]" />
        <p className="text-[15px] text-white/85">
          {event.venue} - {event.city}
        </p>
      </div>
    </Link>
  );
}
