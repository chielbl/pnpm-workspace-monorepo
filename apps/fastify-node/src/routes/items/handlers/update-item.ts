import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { env } from "@/env";
import { getLogger } from "@/log-manager";

const log = getLogger("item");

const itemParamsSchema = Type.Object({
  id: Type.String(),
});
type ItemParams = Static<typeof itemParamsSchema>;

const itemBodySchema = Type.Object({
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
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
  const item = await (await fetch(`${env.DMY_API}${id}`)).json();
  const itemExist = Boolean(item);

  if (!itemExist) {
    reply.code(404).send({ message: `Item with ${id} not found!` });
  }

  const updatedItem = { ...item, ...body };

  await fetch(`${env.DMY_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });

  reply.code(200).send({ message: `Item with ${id} has been updated!` });
};
