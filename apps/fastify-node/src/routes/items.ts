import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";

const itemsRouter = (
  server: FastifyInstance,
  options: any,
  done: DoneFuncWithErrOrRes
) => {
  server.get("/items", async (_, reply) => {
    const res = await fetch("https://dummyjson.com/products");
    const items = await res.json();
    reply.send({ items });
  });

  server.get("/items/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const item = await res.json();
    reply.send({ item });
  });

  done();
};

export default itemsRouter;
