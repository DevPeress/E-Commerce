import pino from "pino";
import fs from "fs";
import path from "path";
import { NODE_ENV } from "./config";

const isProduction = NODE_ENV === "production";

let destination;
if (isProduction) {
  const logDir = path.resolve(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  destination = pino.destination(path.join(logDir, "app.log"));
}

const logger = isProduction
  ? pino(destination)
  : pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
}); 

export default logger;