import { FastifyPluginAsync } from "fastify";
import { itemSchema } from "./schema";
import {
  addItemHandler,
  addItemSchema,
  deleteItemHandler,
  deleteItemSchema,
  getItemHandler,
  getItemSchema,
  getItemsHandler,
  getItemsSchema,
  updateItemHandler,
  updateItemSchema,
} from "./handlers";

const routes: FastifyPluginAsync = async (server) => {
  // server.addHook("onRequest", (req) => req.jwtVerify());
  server.get("/", { schema: getItemsSchema }, getItemsHandler);
  server.get("/:id", { schema: getItemSchema }, getItemHandler);
  server.post("/", { schema: addItemSchema }, addItemHandler);
  server.put("/:id", { schema: updateItemSchema }, updateItemHandler);
  server.delete("/:id", { schema: deleteItemSchema }, deleteItemHandler);
};

export default routes;
export { itemSchema };
export const autoPrefix = "/api/items";
