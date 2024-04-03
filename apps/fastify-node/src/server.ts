import fastify from "fastify";

const server = fastify({ logger: true });
var PORT = 5000;

server.get("/", async () => {
  return { hello: "world" };
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
