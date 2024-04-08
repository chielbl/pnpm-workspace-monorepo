import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import {
  addItemSchema,
  deleteItemSchema,
  getItemSchema,
  getItemsSchema,
} from "./schema";
import {
  addItemHandler,
  deleteItemHandler,
  getItemHandler,
  getItemsHandler,
} from "./handler";

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

export const deleteItemsOptions = {
  schema: deleteItemSchema,
  handler: deleteItemHandler,
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
  server.post("/items", addItemOptions);

  // DELETE item
  server.delete("/items/:id", deleteItemsOptions);

  done();
};

export default itemsRouter;
