import { Context, Next } from "koa";

const ResponseMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
    if (ctx.status === 200) {
      ctx.body = {
        success: true,
        data: ctx.body,
        code: 200,
        message: ctx.message || "请求成功",
      };
    }
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      code: 500,
      data: null,
      message: err.message || ctx.message || "服务异常",
    };
  }
};

export default ResponseMiddleware;
