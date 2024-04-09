import { DoneFuncWithErrOrRes, FastifyInstance, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { addItemSchema, deleteItemSchema, itemSchema, getItemsSchema, updateItemSchema, ItemBody } from "./schema";
import { addItemHandler, deleteItemHandler, getItemHandler, getItemsHandler, updateItemHandler } from "./handler";
import { DMY_API } from "@/server";

// const getItemsOptions = {
//   schema: getItemsSchema,
//   handler: getItemsHandler,
// };

// const getItemOptions = {
//   schema: getItemSchema,
//   handler: getItemHandler,
// };

// const addItemOptions = {
//   schema: addItemSchema,
//   handler: addItemHandler,
// };

const deleteItemsOptions = {
  schema: deleteItemSchema,
  handler: deleteItemHandler,
};

const updateItemOptions = {
  schema: updateItemSchema,
  handler: updateItemHandler,
};

const itemsRouter = (server: FastifyInstance, _options: any, done: DoneFuncWithErrOrRes) => {
  // GET item(s)
  // server.get("/items", getItemsOptions);
  server.get("/items", { schema: getItemsSchema }, getItemsHandler);

  // server.get("/items/:id", getItemOptions);
  server.get(
    "/items/:id",
    {
      schema: {
        params: Type.Object({
          id: Type.String(),
        }),
        response: {
          200: {
            item: itemSchema,
          },
        },
      },
    },
    getItemHandler,
  );

  // ADD item(s)
  // server.post("/items", addItemOptions);
  type Item = Static<typeof itemSchema>;
  server.post("/items", { schema: addItemSchema }, async (req: FastifyRequest<{ Body: ItemBody }>, reply) => {
    const { title, price, description } = req.body;
    const response = await fetch(`${DMY_API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        description,
      }),
    });
    const newItem: Item = await response.json();
    reply.code(201).send({ item: newItem });
  });

  // DELETE item
  server.delete("/items/:id", deleteItemsOptions);

  // UPDATE item
  server.put("/items/:id", updateItemOptions);

  done();
};

export default itemsRouter;
