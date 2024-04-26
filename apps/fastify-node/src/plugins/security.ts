import fp from "fastify-plugin";
import helmet, { FastifyHelmetOptions } from "@fastify/helmet";

/**
 * Resource: https://helmetjs.github.io/#content-security-policy
 */
const contentSecurityPolicy: FastifyHelmetOptions["contentSecurityPolicy"] = {
  useDefaults: false,
  directives: {
    objectSrc: "none",
    baseUri: "none",
    defaultSrc: "self",
    styleSrc: "self",
    fontSrc: "self",
    imgSrc: "self",
    scriptSrc: "self",
    formAction: "self",
    frameAncestors: "self",
    connectSrc: "self",
    // reportUri: "/report-violation",
    // reportTo: "report-violation",
    // reportEndpoint: "report-violation='https://localhost/reports'",
  },
};

/**
 * Resource: https://helmetjs.github.io/#strict-transport-security
 */
const strictTransportSecurity: FastifyHelmetOptions["strictTransportSecurity"] =
  {
    maxAge: 63072000,
    includeSubDomains: false,
    preload: true,
  };

/**
 * Resource:https://helmetjs.github.io/#x-frame-options
 */
const xFrameOptions: FastifyHelmetOptions["xFrameOptions"] = { action: "deny" };

/**
 * Resource: https://helmetjs.github.io/#referrer-policy
 */

/**
 * Docs: https://helmetjs.github.io/#get-started
 */
export default fp<FastifyHelmetOptions>(async (fastify) => {
  fastify.register(helmet, {
    global: true,
    contentSecurityPolicy,
    strictTransportSecurity,
    xFrameOptions,
  });
});
