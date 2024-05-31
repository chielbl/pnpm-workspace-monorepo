import fastifySwagger, { FastifySwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import { itemSchema } from "../routes/items/schema";

/**
 * This plugins adds swagger support
 */
export default fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fastify Node API",
        description: "API documentation for Fastify Node API",
        version: "0.1.0",
      },
      externalDocs: {
        description: "Here can you find more information dummy json API",
        url: "https://dummyjson.com/docs/products",
      },
    },
  });
  fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });

  // register DTO schema's
  fastify.addSchema(itemSchema);

  // register error schema's
  fastify.addSchema({
    $id: "NotFound",
    type: "object",
    description: "Requested resource not found",
    properties: {
      message: { type: "string" },
      status: { type: "string" },
      statusCode: { type: "number" },
      stack: { type: "string" },
      errorCode: { type: "string" },
    },
  });
  // fastify.addSchema({
  //   $id: "BadRequest",
  //   description: "The specified request was invalid",
  //   type: "object",
  //   properties: {
  //     status: { type: "string" },
  //     statusCode: { type: "number" },
  //     message: { type: "string" },
  //     stack: { type: "string" },
  //   },
  // });
  // fastify.addSchema({
  //   $id: "Unauthorized",
  //   description: "Can not request the specified resource",
  //   properties: {
  //     status: { type: "string" },
  //     statusCode: { type: "number" },
  //     message: { type: "string" },
  //     stack: { type: "string" },
  //   },
  // });
  fastify.addSchema({
    $id: "InternalServerError",
    description: "Something unexpected went wrong",
    properties: {
      status: { type: "string" },
      statusCode: { type: "number" },
      message: { type: "string" },
      stack: { type: "string" },
    },
  });
});
