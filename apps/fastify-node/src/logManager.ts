/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from "pino";

type Logger = pino.Logger;
export type { Logger };
export type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

// default root logger
const pinoOptions: any = {
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.LOG_PRETTY
    ? {
        target: "pino-pretty",
        options: {
          messageFormat: "{msg} {req.url}",
          ignore: "pid,req.hostname,req.remoteAddress,req.remotePort",
          translateTime: "dd/mm/yy HH:MM:ss",
        },
      }
    : undefined,
};
const log = pino(pinoOptions);
export default log;

// get client logger
let rootLogger = log;
// eslint-disable-next-line arrow-body-style
export const getLogger = (name: string): Logger => {
  return rootLogger.child({ name });
};

// overwrite root logger
export const setRootLogger = (newLog: Logger) => {
  rootLogger = newLog;
};
