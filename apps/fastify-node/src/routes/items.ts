import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { ItemParams, getItemSchema, getItemsSchema } from "./schemas";
import { DMY_API } from "../server";

export const getItemsOptions = {
  schema: getItemsSchema,
  handler: async (_, reply) => {
    const res = await fetch(DMY_API);
    const items = await res.json();

    reply.send({ items });
  },
};

export const getItemOptions = {
  schema: getItemSchema,
  handler: async (req: { params: ItemParams }, reply: any) => {
    const { id } = req.params as ItemParams; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
    const res = await fetch(`${DMY_API}${id}`);
    const item = await res.json();

    reply.send({ item });
  },
};

const itemsRouter = (
  server: FastifyInstance,
  options: any,
  done: DoneFuncWithErrOrRes
) => {
  server.get("/items", getItemsOptions);

  server.get("/items/:id", getItemOptions);

  done();
};

export default itemsRouter;
