import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { itemSchema } from "../schema";
import { db, products } from "@/db";

const itemBodySchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  shortDescription: Type.Optional(Type.String()),
  price: Type.Number(),
  discountPercentage: Type.Optional(Type.Number()),
  rating: Type.Optional(Type.Number()),
  stock: Type.Number(),
  category: Type.String(),
  thumbnail: Type.String(),
  images: Type.Array(Type.String()),
});
type ItemBody = Static<typeof itemBodySchema>;

export const addItemSchema = {
  tags: ["Items"],
  body: itemBodySchema,
  response: {
    201: { $ref: `${itemSchema.$id}#` },
    "5xx": { $ref: `InternalServerError#` },
  },
};

export const addItemHandler = async (
  req: FastifyRequest<{ Body: ItemBody }>,
  reply: FastifyReply
) => {
  const [newItem] = await db.insert(products).values(req.body).returning();

  reply.code(201).send(newItem);
};
