"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { TicketOrder } from "../lib/tickets";
import { saveOrder, removeOrder, logout } from "./actions";

type SeatForm = { type: string; section: string; row: string; seat: string; price: string };
type OrderForm = {
  id: string;
  status: "upcoming" | "past";
  orderNumber: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  image: string;
  count: string;
  transferStatus: string;
  seats: SeatForm[];
};

const blankSeat = (): SeatForm => ({ type: "Standard", section: "", row: "", seat: "", price: "" });

const blankForm = (): OrderForm => ({
  id: "",
  status: "upcoming",
  orderNumber: "",
  name: "",
  date: "",
  venue: "",
  city: "",
  image: "",
  count: "0",
  transferStatus: "",
  seats: [blankSeat()],
});

function orderToForm(o: TicketOrder): OrderForm {
  return {
    id: o.id,
    status: o.status,
    orderNumber: o.orderNumber ?? "",
    name: o.event.name,
    date: o.event.date,
    venue: o.event.venue,
    city: o.event.city,
    image: o.event.image,
    count: String(o.event.count),
    transferStatus: o.transferStatus ?? "",
    seats: o.seats.map((s) => ({
      type: s.type,
      section: s.section,
      row: s.row,
      seat: s.seat,
      price: s.price != null ? String(s.price) : "",
    })),
  };
}

const inputCls =
  "h-10 w-full rounded-md border border-tm-line bg-white px-3 text-sm text-tm-ink outline-none focus:border-tm-blue";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wide text-tm-ink-soft";

export default function AdminDashboard({
  orders,
  dbConfigured,
}: {
  orders: TicketOrder[];
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<OrderForm>(blankForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = <K extends keyof OrderForm>(k: K, v: OrderForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setSeat = (i: number, k: keyof SeatForm, v: string) =>
    setForm((f) => ({
      ...f,
      seats: f.seats.map((s, j) => (j === i ? { ...s, [k]: v } : s)),
    }));

  function startNew() {
    setForm(blankForm());
    setEditingId(null);
    setMsg(null);
  }
  function startEdit(o: TicketOrder) {
    setForm(orderToForm(o));
    setEditingId(o.id);
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSave() {
    setBusy(true);
    setMsg(null);
    const input = {
      id: editingId || undefined,
      status: form.status,
      orderNumber: form.orderNumber || undefined,
      name: form.name,
      date: form.date,
      venue: form.venue,
      city: form.city,
      image: form.image,
      count: Number(form.count) || 0,
      transferStatus: form.transferStatus || undefined,
      seats: form.seats.map((s) => ({
        type: s.type,
        section: s.section,
        row: s.row,
        seat: s.seat,
        ...(s.price !== "" ? { price: Number(s.price) } : {}),
      })),
    };
    const res = await saveOrder(input);
    setBusy(false);
    if (res.ok) {
      setMsg({ ok: true, text: editingId ? "Saved changes." : "Created listing." });
      startNew();
      router.refresh();
    } else {
      setMsg({ ok: false, text: res.error ?? "Save failed" });
    }
  }

  async function onDelete(id: string) {
    setBusy(true);
    const res = await removeOrder(id);
    setBusy(false);
    if (res.ok) {
      if (editingId === id) startNew();
      router.refresh();
    } else {
      setMsg({ ok: false, text: res.error ?? "Delete failed" });
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-tm-ink">
            Ticket Admin
          </h1>
          <p className="text-sm text-tm-ink-soft">Create and edit ticket listings.</p>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-tm-line px-4 py-2 text-sm font-semibold text-tm-ink hover:bg-white">
            Log out
          </button>
        </form>
      </header>

      {!dbConfigured && (
        <p className="mb-5 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <code>MONGODB_URI</code> isn&apos;t set — you can fill in the form, but saving
          will fail until you add it to <code>.env.local</code> and restart. Reads
          currently show the built-in seed data.
        </p>
      )}

      {/* Form */}
      <section className="mb-8 rounded-2xl border border-tm-line bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-tm-ink">
            {editingId ? "Edit listing" : "New listing"}
          </h2>
          {editingId && (
            <button
              onClick={startNew}
              className="flex items-center gap-1 text-sm font-semibold text-tm-ink-soft hover:text-tm-ink"
            >
              <X className="h-4 w-4" /> Cancel edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Event name</label>
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ariana Grande - The Eternal Sunshine Tour" />
          </div>
          <div>
            <label className={labelCls}>Date (display text)</label>
            <input className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="THU, JUL 23, 2026 • 8:00 PM" />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => set("status", e.target.value as OrderForm["status"])}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Venue</label>
            <input className={inputCls} value={form.venue} onChange={(e) => set("venue", e.target.value)} placeholder="TD Garden" />
          </div>
          <div>
            <label className={labelCls}>City</label>
            <input className={inputCls} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Boston, MA" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Image URL (or /local-path)</label>
            <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://… or /images/ariana.jpg" />
          </div>
          <div>
            <label className={labelCls}>Order number (optional)</label>
            <input className={inputCls} value={form.orderNumber} onChange={(e) => set("orderNumber", e.target.value)} placeholder="75-19711/NY2" />
          </div>
          <div>
            <label className={labelCls}>Header count badge</label>
            <input className={inputCls} type="number" value={form.count} onChange={(e) => set("count", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Transfer status (optional)</label>
            <input className={inputCls} value={form.transferStatus} onChange={(e) => set("transferStatus", e.target.value)} placeholder="Transfer Accepted" />
          </div>
        </div>

        {/* Seats */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className={labelCls}>Seats</span>
            <button
              onClick={() => set("seats", [...form.seats, blankSeat()])}
              className="flex items-center gap-1 text-sm font-semibold text-tm-blue"
            >
              <Plus className="h-4 w-4" /> Add seat
            </button>
          </div>
          <div className="space-y-2">
            {form.seats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 rounded-lg border border-tm-line p-2 sm:grid-cols-[1.4fr_1fr_.7fr_.7fr_.9fr_auto]">
                <input className={inputCls} value={s.type} onChange={(e) => setSeat(i, "type", e.target.value)} placeholder="Type" />
                <input className={inputCls} value={s.section} onChange={(e) => setSeat(i, "section", e.target.value)} placeholder="Section" />
                <input className={inputCls} value={s.row} onChange={(e) => setSeat(i, "row", e.target.value)} placeholder="Row" />
                <input className={inputCls} value={s.seat} onChange={(e) => setSeat(i, "seat", e.target.value)} placeholder="Seat" />
                <input className={inputCls} type="number" value={s.price} onChange={(e) => setSeat(i, "price", e.target.value)} placeholder="$" />
                <button
                  onClick={() => set("seats", form.seats.filter((_, j) => j !== i))}
                  disabled={form.seats.length === 1}
                  aria-label="Remove seat"
                  className="grid place-items-center rounded-md text-tm-ink-soft hover:text-rose-600 disabled:opacity-30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {msg && (
          <p className={`mt-4 text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>
            {msg.text}
          </p>
        )}

        <button
          onClick={onSave}
          disabled={busy}
          className="mt-5 h-11 rounded-full bg-tm-blue px-8 text-sm font-bold text-white transition hover:bg-tm-blue-dark disabled:opacity-60"
        >
          {busy ? "Saving…" : editingId ? "Save changes" : "Create listing"}
        </button>
      </section>

      {/* Existing listings */}
      <h2 className="mb-3 text-lg font-bold text-tm-ink">Listings ({orders.length})</h2>
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center gap-3 rounded-lg border border-tm-line bg-white p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-tm-ink">{o.event.name}</p>
              <p className="truncate text-sm text-tm-ink-soft">
                <span className="uppercase">{o.status}</span> · {o.event.date} · {o.event.venue},{" "}
                {o.event.city} · {o.seats.length} seat{o.seats.length > 1 ? "s" : ""}
              </p>
            </div>
            <button onClick={() => startEdit(o)} aria-label="Edit" className="grid h-9 w-9 place-items-center rounded-md border border-tm-line text-tm-ink hover:border-tm-blue hover:text-tm-blue">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(o.id)} disabled={busy} aria-label="Delete" className="grid h-9 w-9 place-items-center rounded-md border border-tm-line text-tm-ink hover:border-rose-500 hover:text-rose-600 disabled:opacity-40">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
