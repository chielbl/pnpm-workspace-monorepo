/* eslint-disable no-console */
import { db, productsTable, getCount } from "../src/db";
import { getLogger } from "../src/log-manager";

const log = getLogger("seed");

const seedData = async () => {
  console.log("Running seed...");

  // get dummy products
  const res = await fetch(`https://dummyjson.com/products?limit=10`);
  const dummyProductsPayload = await res.json();

  // delete existing products (if any)
  const productCount = await getCount(db, productsTable);
  if (productCount > 0) {
    log.info("Deleting existing products...", productCount);
    await db.delete(productsTable);
  }

  // insert new products
  log.info("Inserting products ...");
  await db.insert(productsTable).values(
    dummyProductsPayload.products.map((item: any) => {
      // eslint-disable-next-line no-param-reassign
      delete item.id;
      return item;
    }),
  );
};

seedData()
  .then(() => {
    log.info("Seed completed successfully");
    process.exit(0);
  })
  .catch((err) => {
    log.error("Seed failed", err);
    process.exit(1);
  });
