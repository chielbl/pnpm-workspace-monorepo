import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "@/env";
import { itemSchema } from "./schema";

export const getItemsSchema = {
  tags: ["Items"],
  response: {
    200: {
      type: "object",
      properties: {
        // page: { type: "number" },
        // pageSize: { type: "number" },
        total: { type: "number" },
        items: { type: "array", items: { $ref: `${itemSchema.$id}#` } },
      },
    },
    "5xx": { $ref: `InternalServerError#` },
  },
};

export const getItemsHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  const res = await fetch(env.DMY_API);
  const result = await res.json();

  // we need to return a subset of the entity to match the schema
  const items = result.products.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item2.description,
  }));

  reply.send({ total: items.length, items });
};
