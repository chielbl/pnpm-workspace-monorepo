import { SQL, count } from "drizzle-orm";
import { PgTable, PgDatabase } from "drizzle-orm/pg-core";

export async function getCount<TFrom extends PgTable | SQL>(db: PgDatabase<any, any>, source: TFrom) {
  const result = await db.select({ count: count() }).from(source);
  if (result.length === 0) {
    return 0;
  }
  return result[0]?.count || 0;
}
