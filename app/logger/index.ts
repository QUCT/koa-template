import { configure, getLogger } from "log4js";

configure({
  // log4js日志配置
  appenders: {
    cheese: {
      type: "dateFile",
      filename: "logs/cheese.log",
      pattern: "yyyy-MM-dd",
      layout: {
        type: "pattern",
        pattern: "[%d] [%p] %c - %m",
      },
      numBackups: 7,
    },
    access: {
      type: "dateFile",
      filename: "logs/access.log",
      pattern: "yyyy-MM-dd",
      layout: {
        type: "pattern",
        pattern: "[%d] [%p] %c - %m",
      },
      numBackups: 7,
    },
    error: {
      type: "dateFile",
      filename: "logs/error.log",
      pattern: "yyyy-MM-dd",
      layout: {
        type: "pattern",
        pattern: "[%d] [%p] %c - %m",
      },
      numBackups: 7,
    },
  },
  categories: {
    default: { appenders: ["cheese"], level: "info" },
    access: { appenders: ["access"], level: "info" },
    error: { appenders: ["error"], level: "error" },
  },
});
export const accessLogger = getLogger("access");
export const errorLogger = getLogger("error");
export default getLogger();
