import path from "node:path";

import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { migrate as postgresMigrator } from "drizzle-orm/postgres-js/migrator";

import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";

import postgres from "postgres";
import { drizzle as drizzleLocal } from "drizzle-orm/postgres-js";
// import { env } from "../env";

console.log("POSTGRES_URL", process.env.DATABASE_URL);
console.log("DATABASE_PROVIDER", process.env.DATABASE_PROVIDER);

const main = async () => {
  try {
    //
    // vercel migration
    //
    if (process.env.DATABASE_PROVIDER === "pg-vercel") {
      console.log("Running vercel postgres migrations...");
      // vercel requires the POSTGRES_URL environment to be set
      // process.env.POSTGRES_URL = env.DATABASE_URL;
      const db = drizzleVercel(sql);
      await vercelMigrate(db, {
        migrationsFolder: path.join(__dirname, "./migrations"),
      });
    } else if (process.env.DATABASE_PROVIDER === "pg") {
      //
      // standard postgres migration
      //
      console.log("Running postgres migrations...");
      const connection = postgres(process.env.DATABASE_URL!, {
        // hide notice warnings
        // onnotice: (notice) => {},
      });
      try {
        const db = drizzleLocal(connection);
        await postgresMigrator(db, {
          migrationsFolder: path.join(__dirname, "./migrations"),
        });
        // eslint-disable-next-line no-useless-catch
      } catch (err) {
        throw err;
      } finally {
        // make sure the connection is closed
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        connection.end;
      }
    } else {
      //
      // unknown migration
      //
      throw new Error(
        `❌ Unsupported DATABASE_PROVIDER "${process.env.DATABASE_PROVIDER}". \
        Please check your environment configuration.`
      );
    }
    console.log("Migrations complete!");
    process.exit(0);
  } catch (err) {
    console.log("Error running migrations:", err);
    process.exit(1);
  }
};

main();
