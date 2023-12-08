import { Context, Next } from "koa";
import { errorLogger } from "../logger";

// 错误处理中间件
const ErrorLoggingMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next(); // 尝试执行后续中间件
  } catch (err: any) {
    // 记录错误信息
    errorLogger.error(`Error occurred: ${err.message}`);

    // 设置响应状态码和消息
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { message: err.message || "Internal Server Error" };

    // 不要“吞掉”错误，而是继续抛出
    ctx.app.emit("error", err, ctx);
  }
};

export default ErrorLoggingMiddleware;
