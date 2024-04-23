/* eslint-disable class-methods-use-this */
import { LogWriter, DefaultLogger } from "drizzle-orm/logger";
import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";

import postgres from "postgres";
import { drizzle as drizzleLocal, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { env } from "../env";
import * as schema from "./schemas";
import { getLogger } from "../log-manager";

const log = getLogger("db");

// eslint-disable-next-line import/no-mutable-exports
let db: VercelPgDatabase<typeof schema> | PostgresJsDatabase<typeof schema>;

// custom log writer
class MyLogWriter implements LogWriter {
  write(message: string) {
    log.debug(message);
  }
}
const logger = new DefaultLogger({ writer: new MyLogWriter() });

if (env.DATABASE_PROVIDER === "pg-vercel") {
  // vercel requires the POSTGRES_URL environment to be set
  process.env.POSTGRES_URL = env.DATABASE_URL;
  db = drizzleVercel(sql, { schema, logger });
} else {
  const connection = postgres(env.DATABASE_URL);
  db = drizzleLocal(connection, { schema, logger });
}

export { db };
export * from "drizzle-orm";
export * from "./schemas";
export * from "./helpers";
