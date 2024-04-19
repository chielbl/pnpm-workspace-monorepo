import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { eq } from "drizzle-orm";
import { getLogger } from "@/log-manager";
import { db } from "@/db";
import { products } from "@/db/schemas";

const log = getLogger("item");

const itemParamsSchema = Type.Object({
  id: Type.String(),
});
type ItemParams = Static<typeof itemParamsSchema>;

const itemBodySchema = Type.Object({
  title: Type.String(),
});
type ItemBody = Static<typeof itemBodySchema>;

export const updateItemSchema = {
  tags: ["Items"],
  params: itemParamsSchema,
  body: itemBodySchema,
  response: {
    200: {
      message: Type.String(),
    },
    404: { $ref: "NotFound#" },
    "5xx": { $ref: `InternalServerError#` },
  },
};

export const updateItemHandler = async (
  req: FastifyRequest<{ Params: ItemParams; Body: ItemBody }>,
  reply: FastifyReply
) => {
  log.debug(`PUT: ${req.params.id}`);

  const { params, body } = req;
  const { id } = params;
  const [item] = await db.select().from(products).where(eq(products.id, id));
  const itemExist = Boolean(item);

  if (!itemExist) {
    reply.code(404).send({ message: `Item with ${id} not found!` });
  }

  const updatedItem = { ...item, ...body, updatedAt: new Date() };

  await db.update(products).set(updatedItem).where(eq(products.id, id));

  reply.code(200).send({ message: `Item with ${id} has been updated!` });
};
