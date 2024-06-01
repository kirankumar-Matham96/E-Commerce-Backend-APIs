import fs from "fs";

const fsPromise = fs.promises;

const log = async (logData) => {
  try {
    logData = new Date().toString() + ". Log Data: " + logData + ";\n";
    await fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(error);
  }
};

export const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("login") && !req.url.includes("register")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    await log(logData);
  }
  next();
};
