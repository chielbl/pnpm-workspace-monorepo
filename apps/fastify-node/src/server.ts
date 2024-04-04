import fastify from "fastify";
import itemsRouter from "./routes/items";

const server = fastify({ logger: true });
var PORT = 8000;

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
