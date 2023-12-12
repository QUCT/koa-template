import { Context, Next } from "koa";
import { errorLogger } from "../logger";

// 错误处理中间件
const ErrorLoggingMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next(); // 尝试执行后续中间件
    const logStr = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.headers["user-agent"]}|`;
    if(ctx.businessCode!==200){
      // 记录错误信息
      printErrorLog(ctx)
    }
  } catch (err: any) {
    // 记录错误信息
    printErrorLog(ctx,err)
    // 设置响应状态码和消息
    ctx.message = err.message;
    ctx.body = {};
    ctx.status = err?.status

    // 不要“吞掉”错误，而是继续抛出 让resonse中间件去格式化代码
    ctx.app.emit("error", err, ctx);
  }
};

const printErrorLog = (ctx:Context,err?:any)=>{
  const logStr = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.headers["user-agent"]}|`;
  if(err){
    return errorLogger.error(`Error occurred:${logStr} ${ err.message}`);
  }
  errorLogger.error(`Error occurred:${logStr} ${ctx.msg || ctx.message}`);
}

export default ErrorLoggingMiddleware;
