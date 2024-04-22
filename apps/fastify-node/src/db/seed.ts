import { products as productsTable } from "./schemas/products";
import { usersTable, type ProductDBM } from "./schemas";
import log from "@/log-manager";
import { db } from ".";

const main = async () => {
  log.info("Running seed...");
  /*
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
  */

  // Power of inserting data
  /*
  const user = await db
    .insert(usersTable)
    .values([
      { name: "John Doe", age: 1, email: "jd@test.be" },
      { name: "Jane Doe", age: 2, email: "jd2@test.be" },
    ]) // Power to insert multiple values
    .returning({ id: usersTable.id, userName: usersTable.name })
    .onConflictDoUpdate({
      target: [usersTable.email],
      set: {
        name: `updated`,
        updatedAt: new Date(),
      },
    }); // onConflictDoUpdate works only with Postgres and SQLite (optional feature)
  console.log("🚀 ~ main ~ user:", user);
  */
  log.info("Seed completed!");
};

main();
