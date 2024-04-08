import { FastifyReply, FastifyRequest } from "fastify";
import { DMY_API } from "@/server";
import { ItemParams, ItemBody, Item } from "./schema";

// GET item(s)
export const getItemsHandler = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  const res = await fetch(DMY_API);
  const items = await res.json();

  reply.send({ items });
};

export const getItemHandler = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
  const res = await fetch(`${DMY_API}${id}`);
  const item = await res.json();

  reply.send({ item });
};

// ADD item(s)
export const addItemHandler = async (
  req: FastifyRequest<{ Body: ItemBody }>,
  reply: FastifyReply
) => {
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
};
//

// DELETE item
export const deleteItemHandler = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  await fetch(`${DMY_API}/${id}`, {
    method: "DELETE",
  });

  reply.code(200).send({ message: `Item with ${id} has been deleted!` });
};
