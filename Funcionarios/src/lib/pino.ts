import pino from "pino";
import fs from "fs";
import path from "path";

const logDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const streams = [
  process.stdout,                       
  pino.destination(path.join(logDir, "app.log")) 
];

const logger = pino(
  {
    level: "info",
    transport: process.env.NODE_ENV === "development"
      ? { target: "pino-pretty", options: { colorize: true, translateTime: "HH:MM:ss" } }
      : undefined,
  },
  pino.multistream(streams)
);

export default logger;
