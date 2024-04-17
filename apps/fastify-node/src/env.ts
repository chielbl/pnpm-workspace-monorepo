import "dotenv/config";
// @ts-ignore
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DMY_API: z
      .string()
      .url()
      .optional()
      .transform((url) => url || "https://dummyjson.com/products"),
    PORT: z
      .string()
      .optional()
      .transform((port) => parseInt(port || "8000", 10)),
    HOST: z
      .string()
      .optional()
      .transform((host) => host || "localhost"),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .optional()
      .transform((v) => v || "info"),
    LOG_REQUEST: z
      .string()
      .optional()
      .transform((v) => v === "true"),
    LOG_PRETTY: z
      .string()
      .optional()
      .transform((v) => v === "true"),
  },
  runtimeEnv: process.env,
});
