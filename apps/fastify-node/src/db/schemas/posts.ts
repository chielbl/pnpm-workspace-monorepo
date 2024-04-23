import {
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { categoriesTable } from "./categories";
// eslint-disable-next-line import/no-cycle
import { usersTable } from "./users";

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

// RELATIONS
export const postsTableRelations = relations(postsTable, ({ one, many }) => ({
  authId: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.id],
  }),
  category: many(postCategoriesTable),
}));

export const postCategoriesTableRelations = relations(
  postCategoriesTable,
  ({ one }) => ({
    post: one(postsTable, {
      fields: [postCategoriesTable.postId],
      references: [postsTable.id],
    }),
    category: one(categoriesTable, {
      fields: [postCategoriesTable.categoryId],
      references: [categoriesTable.id],
    }),
  })
);
