import "dotenv/config";
import type { Config } from "drizzle-kit";
import { env } from "./src/env";

console.log("DATABASE_URL", env.DATABASE_URL);

export default {
  schema: "./src/db/schemas/*",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: false,
  strict: true,
} satisfies Config;
