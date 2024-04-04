import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { getAllItemSchema, getItemSchema } from "./schemas";

const itemRouter = (
  server: FastifyInstance,
  options: any,
  done: DoneFuncWithErrOrRes
) => {
  server.get("/items", getAllItemSchema, async (_, reply) => {
    const res = await fetch("https://dummyjson.com/products");
    const items = await res.json();
    console.log("🚀 ~ items:", items);
    reply.send({ items });
  });

  server.get("/items/:id", getItemSchema, async (req, reply) => {
    const { id } = req.params;
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const item = await res.json();
    console.log("🚀 ~ item:", item);
    reply.send({ item });
  });

  done();
};

export default itemRouter;
