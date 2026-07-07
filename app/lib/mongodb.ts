import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "ticketmaster";

// Reuse the client across hot-reloads in dev (otherwise every reload leaks a
// new connection pool). See the standard Next.js MongoDB pattern.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function isDbConfigured(): boolean {
  return Boolean(uri);
}

export function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}
