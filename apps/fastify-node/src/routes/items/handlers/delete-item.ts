import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { getLogger } from "@/log-manager";
import { db } from "@/db";
import { products } from "@/db/schemas";

const log = getLogger("item");

const itemParamsSchema = Type.Object({
  id: Type.String(),
});
type ItemParams = Static<typeof itemParamsSchema>;

export const deleteItemSchema = {
  tags: ["Items"],
  params: itemParamsSchema,
  response: {
    200: {
      message: Type.String(),
    },
    404: { $ref: "NotFound#" },
    "5xx": { $ref: `InternalServerError#` },
  },
};

export const deleteItemHandler = async (
  req: FastifyRequest<{ Params: ItemParams }>,
  reply: FastifyReply
) => {
  log.debug(`DELETE: ${req.params.id}`);

  const { id } = req.params;
  const [item] = await db.select().from(products).where(eq(products.id, id));
  const itemExist = Boolean(item);

  if (!itemExist) {
    reply.code(404).send({ message: `Item with ${id} not found!` });
  }

  await db.delete(products).where(eq(products.id, id)).returning();

  reply.code(200).send({ message: `Item with ${id} has been deleted!` });
};
