import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import itemRouter from "./routes/item";

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
var PORT = 8000;

server.register(itemRouter);

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
