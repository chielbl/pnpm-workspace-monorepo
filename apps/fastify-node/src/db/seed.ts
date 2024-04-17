import { productsTable } from "./schemas/products";
import { type Product } from "./schemas";
import log from "@/log-manager";
import { db } from ".";

const main = async () => {
  log.info("Running seed...");
  // Seed data here
  const res = await fetch("https://dummyjson.com/products?limit=10");
  const { products } = (await res.json()) as { products: Product[] };
  const mappedProducts = products.map(
    // eslint-disable-next-line no-param-reassign
    (product) => delete product.id && product
  );

  await db.insert(productsTable).values(mappedProducts);

  log.info("Seed completed");
};

main();
