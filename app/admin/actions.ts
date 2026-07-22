"use server";

import crypto from "node:crypto";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, signSession, isAdmin } from "../lib/auth";
import { upsertOrder, deleteOrder } from "../lib/db/orders";
import type { TicketOrder } from "../lib/tickets";

export type LoginState = { error?: string };
export type SaveResult = { ok: boolean; error?: string; id?: string };

// ---- auth ----
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { error: "ADMIN_PASSWORD is not set on the server." };
  if (password !== expected) return { error: "Incorrect password." };

  const store = await cookies();
  store.set(ADMIN_COOKIE, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8h
  });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

// ---- order CRUD ----
const seatSchema = z.object({
  type: z.string().trim().min(1, "Ticket type required"),
  section: z.string().trim().min(1, "Section required"),
  row: z.string().trim().min(1, "Row required"),
  seat: z.string().trim().min(1, "Seat required"),
  price: z.coerce.number().min(0).optional(),
});

const orderSchema = z.object({
  id: z.string().trim().optional(),
  status: z.enum(["upcoming", "past"]),
  orderNumber: z.string().trim().optional(),
  name: z.string().trim().min(1, "Event name required"),
  date: z.string().trim().min(1, "Date required"),
  venue: z.string().trim().min(1, "Venue required"),
  city: z.string().trim().min(1, "City required"),
  image: z
    .string()
    .trim()
    .min(1, "Image required")
    .refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), {
      message: "Image must be a URL (https://…) or a local /path",
    }),
  count: z.coerce.number().int().min(0).default(0),
  transferStatus: z.string().trim().optional(),
  seats: z.array(seatSchema).min(1, "Add at least one seat"),
});

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "event"
  );
}

export async function saveOrder(input: unknown): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };

  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;
  const id = d.id?.trim() || `${slugify(d.name)}-${crypto.randomUUID().slice(0, 6)}`;

  const order: TicketOrder = {
    id,
    status: d.status,
    orderNumber: d.orderNumber || undefined,
    event: {
      name: d.name,
      date: d.date,
      venue: d.venue,
      city: d.city,
      image: d.image,
      count: d.count,
    },
    seats: d.seats,
    transferStatus: d.transferStatus || undefined,
  };

  try {
    await upsertOrder(order);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }

  revalidatePath("/my-tickets");
  revalidatePath(`/my-tickets/${id}`);
  revalidatePath("/admin");
  return { ok: true, id };
}

export async function removeOrder(id: string): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };
  try {
    await deleteOrder(id);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
  revalidatePath("/my-tickets");
  revalidatePath("/admin");
  return { ok: true };
}
