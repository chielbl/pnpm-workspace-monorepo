import path from "node:path";
import fastifyAutoload, { AutoloadPluginOptions } from "@fastify/autoload";
import fastify, { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import log from "@/logManager";
import { env } from "@/env";

export type ServerOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

export const createFastifyServer = async (opts: ServerOptions = {}): Promise<FastifyInstance> => {
  const server: any = fastify({
    logger: log.child({ name: "server" }),
    disableRequestLogging: !env.LOG_REQUEST,
  }).withTypeProvider<TypeBoxTypeProvider>();

  server.register(fastifyAutoload, {
    // load plugins from ./plugins
    dir: path.join(__dirname, "plugins"),
    options: opts,
  });
  server.register(fastifyAutoload, {
    // load routes from ./routes
    dir: path.join(__dirname, "routes"),
    options: opts,
  });

  return server;
};
