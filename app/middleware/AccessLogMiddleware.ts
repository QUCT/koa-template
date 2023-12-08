import { Context, Next } from "koa";
import { accessLogger } from "../logger";

const AccessLogMiddleWare = (ctx: Context, next: Next) => {
  const logStr = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.headers["user-agent"]}|`;
  accessLogger.info(logStr);
  return next();
};
export default AccessLogMiddleWare;
