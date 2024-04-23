import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { postsTable } from "./posts";

export const userRole = pgEnum("userRole", ["ADMIN", "USER"]);
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    age: integer("age").notNull(),
    role: userRole("role").default("USER"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("email_index").on(table.email),
    uniqueNameAge: unique("unique_name_age").on(table.name, table.age), // Every user must have a unique name and age
  })
);

// One To one relationship
export const userPreferencesTable = pgTable("userPreferences", {
  id: serial("id").primaryKey(),
  wantEmailUpdates: boolean("wantEmailUpdates").notNull().default(false),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id),
});

// RELATIONS
export const userTableRelations = relations(usersTable, ({ one, many }) => ({
  preference: one(userPreferencesTable),
  posts: many(postsTable),
}));

export const userPreferencesTableRelations = relations(
  userPreferencesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userPreferencesTable.userId],
      references: [usersTable.id],
    }),
  })
);
