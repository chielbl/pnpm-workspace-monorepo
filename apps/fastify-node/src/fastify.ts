import path from "node:path";
import fastifyAutoload, { AutoloadPluginOptions } from "@fastify/autoload";
import f, { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import log from "@/log-manager";
import { env } from "@/env";

export type ServerOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

export const createFastifyServer = async (
  opts: ServerOptions = {}
): Promise<FastifyInstance> => {
  const fastify: any = f({
    logger: log.child({ name: "fastify" }),
    disableRequestLogging: !env.LOG_REQUEST,
  }).withTypeProvider<TypeBoxTypeProvider>();

  fastify.register(fastifyAutoload, {
    // load plugins from ./plugins
    dir: path.join(__dirname, "plugins"),
    options: opts,
  });
  fastify.register(fastifyAutoload, {
    // load routes from ./routes
    dir: path.join(__dirname, "routes"),
    options: opts,
  });
  console.log("🚀 ~", path.join(__dirname, "routes"));

  return fastify;
};
