// import { FastifyReply } from "fastify";
import log from "./log-manager";
import { createFastifyServer } from "./fastify";

async function startup() {
  // Create Fastify server
  const server = await createFastifyServer();

  // server.register(itemsRouter);

  // alive route
  // server.get("/", async (_, reply: FastifyReply) => {
  //   reply.send({ hello: "server" });
  // });

  // Open DB
  // const dbConn = await openDB();

  // Listen for http requests
  server.listen({ port: Number(process.env.PORT), host: process.env.HOST });
  console.log("🚀 ~ startup ~ process.env.HOST:", process.env.HOST);
  console.log("🚀 ~ startup ~ process.env.PORT:", process.env.PORT);

  // Handle graceful shutdown
  const shutdown = async () => {
    // eslint-disable-next-line no-console
    console.log("SIGTERM received, shutting down...");
    await server.close();
    // close DB connection
    // dbConn.close();
  };
  process.on("SIGTERM", shutdown); // ctrl-c
  process.on("SIGINT", shutdown);
  process.on("SIGQUIT", shutdown);
}

// Startup the servers and open connections
startup().catch((err) => {
  log.error(err.message);
  log.warn("One or more subsystems not available, quitting...");
  process.exit(-1);
});
