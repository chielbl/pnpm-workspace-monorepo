import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { env } from "@/env";
import { type Item, itemSchema } from "../schema";

const itemBodySchema = Type.Object({
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
type ItemBody = Static<typeof itemBodySchema>;

export const addItemSchema = {
  tags: ["Items"],
  body: itemBodySchema,
  response: {
    201: {
      item: itemSchema,
    },
  },
};

export const addItemHandler = async (
  req: FastifyRequest<{ Body: ItemBody }>,
  reply: FastifyReply
) => {
  const { title, price, description } = req.body;
  const response = await fetch(`${env.DMY_API}/add`, {
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
