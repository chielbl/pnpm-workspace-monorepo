import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";

import postgres from "postgres";
import { drizzle as drizzleLocal, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { env } from "../env";

// eslint-disable-next-line import/no-mutable-exports
let db: VercelPgDatabase<Record<string, never>> | PostgresJsDatabase<Record<string, never>>;

if (env.DATABASE_PROVIDER === "pg-vercel") {
  // vercel requires the POSTGRES_URL environment to be set
  process.env.POSTGRES_URL = env.DATABASE_URL;
  db = drizzleVercel(sql);
} else {
  const connection = postgres(env.DATABASE_URL);
  db = drizzleLocal(connection);
}

export { db };
export * from "drizzle-orm";
export * from "./schemas";
