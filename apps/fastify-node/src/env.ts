// @ts-ignore
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// const clientEnvSchema = {
//   // Place your custom client environment variables below here.
// };
const serverEnvSchema = {
  DATABASE_URL: z.string().url(),
  DATABASE_SEED_URL: z.string().url(),
  // .transform((url) => url || "https://dummyjson.com/products"),
  PORT: z.string().optional(),
  // .transform((port) => parseInt(port || "8000", 10)),
  HOST: z.string(),
  // .transform((host) => host || "localhost"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .optional(),
  // .transform((v) => v || "info"),
  LOG_REQUEST: z.string().optional(),
  // .transform((v) => v === "true"),
  LOG_PRETTY: z.string().optional(),
  // .transform((v) => v === "true"),
};

// const envSchema = z.object({...clientEnvSchema,...serverEnvSchema});
const envSchema = z.object(serverEnvSchema);

export type Env = z.infer<typeof envSchema>;

export const env = createEnv({
  server: serverEnvSchema,
  runtimeEnv: process.env,
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      // [key: string]: string | undefined;
      // add more environment variables and their types here
    }
  }
}
