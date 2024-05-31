/* eslint-disable class-methods-use-this */
import {
  drizzle as drizzleVercel,
  type VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { DefaultLogger, LogWriter } from "drizzle-orm/logger";
import postgres from "postgres";
import {
  PostgresJsDatabase,
  drizzle as drizzleLocal,
} from "drizzle-orm/postgres-js";
import * as schema from "./schemas";
import { getLogger } from "../log-manager";

const log = getLogger("db");
// custom log writer
class MyLogWriter implements LogWriter {
  write(message: string) {
    log.debug(message);
  }
}
const logger = new DefaultLogger({ writer: new MyLogWriter() });

// eslint-disable-next-line import/no-mutable-exports
let db: VercelPgDatabase<typeof schema> | PostgresJsDatabase<typeof schema>;

if (process.env.DATABASE_PROVIDER === "pg-vercel") {
  // vercel requires the POSTGRES_URL environment to be set
  process.env.POSTGRES_URL = process.env.DATABASE_URL;
  db = drizzleVercel(sql, { schema, logger });
} else {
  const connection = postgres(process.env.DATABASE_URL!);
  db = drizzleLocal(connection, { schema, logger });
}

export { db };
export * from "drizzle-orm";
export * from "./schemas";
export * from "./helpers";
