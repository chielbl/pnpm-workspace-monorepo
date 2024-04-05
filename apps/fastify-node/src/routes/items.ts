import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { ItemParams, getItemsSchema, getItemSchema } from "./schemas";

const itemsRouter = (
  server: FastifyInstance,
  options: any,
  done: DoneFuncWithErrOrRes
) => {
  server.get("/items", getItemsSchema, async (_, reply) => {
    const res = await fetch("https://dummyjson.com/products");
    const items = await res.json();

    reply.send({ items });
  });

  server.get("/items/:id", getItemSchema, async (req, reply) => {
    const { id } = req.params as ItemParams; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const item = await res.json();

    reply.send({ item });
  });

  done();
};

export default itemsRouter;
