import {
  pgTable,
  uuid,
  text,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  shortDescription: varchar("shortDescription", { length: 128 }),
  price: decimal("price").notNull(),
  discountPercentage: decimal("discountPercentage"),
  rating: decimal("rating"),
  stock: decimal("stock").notNull(),
  category: text("category").notNull(),
  thumbnail: text("thumbnail").notNull(),
  images: text("images").array(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// DBM stands for Database Model
export type ProductDBM = typeof productsTable.$inferInsert;
