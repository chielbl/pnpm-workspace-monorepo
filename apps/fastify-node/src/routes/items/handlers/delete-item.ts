import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { getLogger } from "@/log-manager";

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
  const itemExist = Boolean(
    await (await fetch(`${process.env.DMY_API}/${id}`)).json()
  );

  if (!itemExist) {
    reply.code(404).send({ message: `Item with ${id} not found!` });
  }

  await fetch(`${process.env.DMY_API}/${id}`, {
    method: "DELETE",
  });

  reply.code(200).send({ message: `Item with ${id} has been deleted!` });
};
