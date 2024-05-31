import { FastifyReply, FastifyRequest } from "fastify";
import { itemSchema } from "../schema";
import { db, products } from "../../../db";

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

export const getItemsHandler = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  const items = await db.select().from(products);
  reply.send({ total: items.length, items });
};
