import { DMY_API } from "@/server";
import { ItemParams } from "./schema";

export const getItemsHandler = async (_: any, reply: any) => {
  const res = await fetch(DMY_API);
  const items = await res.json();

  reply.send({ items });
};

export const getItemHandler = async (
  req: { params: ItemParams },
  reply: any
) => {
  const { id } = req.params; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
  const res = await fetch(`${DMY_API}${id}`);
  const item = await res.json();

  reply.send({ item });
};
