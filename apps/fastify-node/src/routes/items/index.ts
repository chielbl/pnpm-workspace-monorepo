import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { getItemSchema, getItemsSchema } from "./schema";
import { getItemHandler, getItemsHandler } from "./handler";

export const getItemsOptions = {
  schema: getItemsSchema,
  handler: getItemsHandler,
};

export const getItemOptions = {
  schema: getItemSchema,
  handler: getItemHandler,
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
