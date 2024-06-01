import winston from "winston";

const logInfo = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Request - logging" },
  transports: [new winston.transports.File({ filename: "logs.log" })],
});

export const logError = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "Error - logging" },
  transports: [new winston.transports.File({ filename: "logs.log" })],
});

export const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login") && !req.url.includes("register")) {
    const logData = `${new Date().toString()} - Req URL: ${
      req.url
    } - Req Body: ${JSON.stringify(req.body)}`;
    logInfo.info(logData);
  }
  next();
};

export const errorLoggerMiddleware = async (err, req, res) => {
  const errorData = `${new Date().toString()} - Req URL: ${
    req.url
  } - Error: ${err}`;
  logError.error(errorData);
};
