import winston from "winston";
import process from "process";

const { combine, json, prettyPrint, cli } = winston.format;

const logger = winston.createLogger({
  level: "info",
  //format: combine(json(), prettyPrint()),
  defaultMeta: { service: "booking-api" },
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(json(), prettyPrint(), cli()),
    })
  );
}

export default logger;
