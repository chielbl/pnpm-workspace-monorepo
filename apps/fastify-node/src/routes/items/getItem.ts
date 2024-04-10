import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { env } from "@/env";
import { itemSchema } from "./schema";

export const itemParamsSchema = Type.Object({
  id: Type.String(),
});
export type ItemParams = Static<typeof itemParamsSchema>;

export const getItemSchema = {
  tags: ["Items"],
  params: itemParamsSchema,
  response: {
    200: { $ref: `${itemSchema.$id}#` },
    404: { $ref: "NotFound#" },
    "5xx": { $ref: `InternalServerError#` },
  },
};

export const getItemHandler = async (req: FastifyRequest<{ Params: ItemParams }>, reply: FastifyReply) => {
  const { id } = req.params; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
  const res = await fetch(`${env.DMY_API}${id}`);
  const item = await res.json();

  reply.send({ item });
};
