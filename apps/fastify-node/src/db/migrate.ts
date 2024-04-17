import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from ".";
import log from "@/log-manager";

const main = async () => {
  log.info("Running migrations...");
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
};

main();
