import type { Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  schema: "./src/db/schemas/*",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
