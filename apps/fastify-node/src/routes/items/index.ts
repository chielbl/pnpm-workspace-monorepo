import { FastifyPluginAsync } from "fastify";
import { getItemsHandler, getItemsSchema } from "./getItems";
import { getItemHandler, getItemSchema } from "./getItem";
import { addItemHandler, addItemSchema } from "./addItem";
import { deleteItemHandler, deleteItemSchema } from "./deleteItem";
import { updateItemHandler, updateItemSchema } from "./updateItem";
import { itemSchema } from "./schema";

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
