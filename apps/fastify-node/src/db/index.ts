import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schemas from "./schemas";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema: schemas });
export * from "drizzle-orm";
export * from "./schemas";
