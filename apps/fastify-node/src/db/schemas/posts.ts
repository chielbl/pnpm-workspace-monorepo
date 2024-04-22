import {
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { categoriesTable } from "./categories";

// One to many relationship
export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  rating: real("rating").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: serial("authorId")
    .references(() => usersTable.id)
    .notNull(),
});

// Many to many relationship
export const postCategoriesTable = pgTable(
  "postCategories",
  {
    postId: serial("postId")
      .references(() => postsTable.id)
      .notNull(),
    categoryId: serial("categoryId")
      .references(() => categoriesTable.id)
      .notNull(),
  },
  (table) => ({
    primaryKey: primaryKey({ columns: [table.postId, table.categoryId] }),
  })
);
