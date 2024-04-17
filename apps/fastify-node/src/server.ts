import "dotenv/config";
import { FastifyReply } from "fastify";
import log from "./log-manager";
import { env } from "./env";
import { createFastifyServer } from "./fastify";

async function startup() {
  // Create Fastify server
  const server = await createFastifyServer();

  // server.register(itemsRouter);

  // alive route
  server.get("/", async (_, reply: FastifyReply) => {
    reply.send({ hello: "server" });
  });

  // Open DB
  // const dbConn = await openDB();

  // Listen for http requests
  await server.listen({ port: env.PORT, host: env.HOST });

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
