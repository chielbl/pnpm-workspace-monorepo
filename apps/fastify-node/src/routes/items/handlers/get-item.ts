import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { eq } from "drizzle-orm";
import { itemSchema } from "../schema";
import { getLogger } from "@/log-manager";
import { db } from "@/db";
import { products } from "@/db/schemas";

const log = getLogger("item");

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

export const getItemHandler = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply
) => {
  log.debug(`GET: ${req.params.id}`);

  const { id } = req.params; // QUESTION: Why do we need to cast req.params as ItemParams and doesn't get to right type from getItemSchema?
  const [item] = await db.select().from(products).where(eq(products.id, id));
  const itemExist = Boolean(item);

  if (!itemExist) {
    reply.code(404).send({ message: `Item with ${id} not found!` });
  }

  reply.send(item);
};
