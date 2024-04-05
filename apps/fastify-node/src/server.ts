import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { itemsRouter } from "./routes";

export const PORT = 8000;
export const DMY_API = "https://dummyjson.com/products/";
const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(itemsRouter);

server.get("/", async (_, reply) => {
  reply.send({ hello: "server" });
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
