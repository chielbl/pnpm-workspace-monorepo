import { pgTable, serial, text, numeric, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    age: numeric("age").notNull(),
    email: text("email").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (users) => ({
    uniqueIdx: uniqueIndex("unique_idx").on(users.email),
  }),
);

export type User = typeof usersTable.$inferInsert;
