import path from "node:path";
import { env } from "../src/env";

import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { migrate as postgresMigrator } from "drizzle-orm/postgres-js/migrator";

import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";

import postgres from "postgres";
import { drizzle as drizzleLocal, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

console.log("POSTGRES_URL", env.DATABASE_URL);
console.log("DATABASE_PROVIDER", env.DATABASE_PROVIDER);

const main = async () => {
  try {
    //
    // vercel migration
    //
    if (env.DATABASE_PROVIDER === "pg-vercel") {
      console.log("Running vercel postgres migrations...");
      // vercel requires the POSTGRES_URL environment to be set
      process.env.POSTGRES_URL = env.DATABASE_URL;
      const db = drizzleVercel(sql);
      await vercelMigrate(db, {
        migrationsFolder: path.join(__dirname, "./migrations"),
      });
    } else if (env.DATABASE_PROVIDER === "pg") {
      //
      // standard postgres migration
      //
      console.log("Running postgres migrations...");
      const connection = postgres(env.DATABASE_URL, {
        // hide notice warnings
        onnotice: (notice) => {},
      });
      try {
        const db = drizzleLocal(connection);
        await postgresMigrator(db, {
          migrationsFolder: path.join(__dirname, "./migrations"),
        });
      } catch (err) {
        throw err;
      } finally {
        // make sure the connection is closed
        connection.end;
      }
    } else {
      //
      // unknown migration
      //
      throw new Error(
        `❌ Unsupported DATABASE_PROVIDER "${env.DATABASE_PROVIDER}". \
        Please check your environment configuration.`,
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
