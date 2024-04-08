import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { addItemSchema, getItemSchema, getItemsSchema } from "./schema";
import { addItemHandler, getItemHandler, getItemsHandler } from "./handler";

export const getItemsOptions = {
  schema: getItemsSchema,
  handler: getItemsHandler,
};

export const getItemOptions = {
  schema: getItemSchema,
  handler: getItemHandler,
};

export const addItemOptions = {
  schema: addItemSchema,
  handler: addItemHandler,
};

const itemsRouter = (
  server: FastifyInstance,
  options: any,
  done: DoneFuncWithErrOrRes
) => {
  // GET item(s)
  server.get("/items", getItemsOptions);
  server.get("/items/:id", getItemOptions);

  // ADD item(s)
  server.post("/item", addItemOptions);

  done();
};

export default itemsRouter;
