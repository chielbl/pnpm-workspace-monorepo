import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { env } from "@/env";

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
  },
};

export const deleteItemHandler = async (req: FastifyRequest<{ Params: ItemParams }>, reply: FastifyReply) => {
  const { id } = req.params;
  await fetch(`${env.DMY_API}/${id}`, {
    method: "DELETE",
  });

  reply.code(200).send({ message: `Item with ${id} has been deleted!` });
};
