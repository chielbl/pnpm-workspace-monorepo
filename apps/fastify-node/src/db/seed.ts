import { products as productsTable } from "./schemas/products";
import { type ProductDBM } from "./schemas";
import log from "@/log-manager";
import { db } from ".";

const main = async () => {
  log.info("Running seed...");
  // Seed data here

  const res = await fetch(`${process.env.DATABASE_SEED_URL}?limit=10`);
  const { products } = (await res.json()) as { products: ProductDBM[] };
  const mappedProducts = products.map(
    // eslint-disable-next-line no-param-reassign
    (product) => delete product.id && product
  );
  const itemsExist = Boolean((await db.query.products.findMany()).length);

  if (itemsExist) {
    log.info("Deleting existing products...");
    await db.delete(productsTable);
    log.info("Deleting completed!");
  }

  log.info("Inserting products ...");
  await db.insert(productsTable).values(mappedProducts);
  log.info("Inserting completed!");

  log.info("Seed completed!");
};

main();