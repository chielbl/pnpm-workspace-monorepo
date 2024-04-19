import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas/*",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
