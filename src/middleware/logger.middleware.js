import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Request - logging" },
  transports: [new winston.transports.File({ filename: "logs.log" })],
});

export const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login") && !req.url.includes("register")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
};
