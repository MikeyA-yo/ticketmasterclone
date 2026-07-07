import type { Document } from "mongodb";
import { isDbConfigured, getDb } from "../mongodb";
import { orders as seedOrders, type TicketOrder } from "../tickets";

const COLLECTION = "orders";

function toOrder(doc: Document): TicketOrder {
  // strip Mongo's _id; the rest already matches TicketOrder
  const { _id, ...rest } = doc as Record<string, unknown>;
  void _id;
  return rest as unknown as TicketOrder;
}

/** All orders. Falls back to the built-in seed data when the DB is unconfigured/empty/unreachable. */
export async function listOrders(): Promise<TicketOrder[]> {
  if (!isDbConfigured()) return seedOrders;
  try {
    const db = await getDb();
    const docs = await db.collection(COLLECTION).find({}).sort({ status: 1 }).toArray();
    return docs.length ? docs.map(toOrder) : seedOrders;
  } catch {
    return seedOrders;
  }
}

export async function getOrderById(id: string): Promise<TicketOrder | undefined> {
  if (!isDbConfigured()) return seedOrders.find((o) => o.id === id);
  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ id });
    return doc ? toOrder(doc) : seedOrders.find((o) => o.id === id);
  } catch {
    return seedOrders.find((o) => o.id === id);
  }
}

/** Create or update an order (by `id`). Requires a configured DB. */
export async function upsertOrder(order: TicketOrder): Promise<void> {
  if (!isDbConfigured()) {
    throw new Error("MONGODB_URI is not set — add it to .env.local to save orders.");
  }
  const db = await getDb();
  await db.collection(COLLECTION).updateOne({ id: order.id }, { $set: order }, { upsert: true });
}

export async function deleteOrder(id: string): Promise<void> {
  if (!isDbConfigured()) {
    throw new Error("MONGODB_URI is not set — add it to .env.local to delete orders.");
  }
  const db = await getDb();
  await db.collection(COLLECTION).deleteOne({ id });
}

/** One-time helper: load the seed orders into an empty collection. */
export async function seedIfEmpty(): Promise<number> {
  if (!isDbConfigured()) return 0;
  const db = await getDb();
  const count = await db.collection(COLLECTION).countDocuments();
  if (count > 0) return 0;
  await db.collection(COLLECTION).insertMany(seedOrders.map((o) => ({ ...o })));
  return seedOrders.length;
}
