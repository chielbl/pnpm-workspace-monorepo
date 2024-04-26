import fp from "fastify-plugin";
import helmet, { FastifyHelmetOptions } from "@fastify/helmet";

/**
 * Bron: https://helmetjs.github.io/#content-security-policy
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
 * Docs: https://helmetjs.github.io/#get-started
 */
export default fp<FastifyHelmetOptions>(async (fastify) => {
  fastify.register(helmet, {
    global: true,
    enableCSPNonces: true, // enable csp nonces generation with default content-security-policy option
    contentSecurityPolicy,
  });
});
