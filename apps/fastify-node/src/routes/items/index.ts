import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import {
  addItemSchema,
  deleteItemSchema,
  getItemSchema,
  getItemsSchema,
  updateItemSchema,
} from "./schema";
import {
  addItemHandler,
  deleteItemHandler,
  getItemHandler,
  getItemsHandler,
  updateItemHandler,
} from "./handler";

const getItemsOptions = {
  schema: getItemsSchema,
  handler: getItemsHandler,
};

const getItemOptions = {
  schema: getItemSchema,
  handler: getItemHandler,
};

const addItemOptions = {
  schema: addItemSchema,
  handler: addItemHandler,
};

const deleteItemsOptions = {
  schema: deleteItemSchema,
  handler: deleteItemHandler,
};

const updateItemOptions = {
  schema: updateItemSchema,
  handler: updateItemHandler,
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

  // UPDATE item
  server.put("/items/:id", updateItemOptions);

  done();
};

export default itemsRouter;
