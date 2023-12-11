import { Context, Next } from "koa";

const ResponseMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
    if (ctx.businessCode) {
      // 正常业务流程
      if (ctx.businessCode !== 200) {
        return (ctx.body = {
          success: false,
          data: ctx.body,
          code: ctx.businessCode,
          msg: ctx.msg || "请求异常",
        });
      } else {
        return (ctx.body = {
          success: true,
          data: ctx.body,
          code: ctx.businessCode,
          msg: ctx.msg || "请求成功",
        });
      }
    } else {
      return (ctx.body = {
        success: true,
        data: ctx.body,
        code: ctx.status,
        msg: ctx.msg,
      });
    }
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      code: 500,
      data: null,
      msg: err.message || ctx.message || "服务异常",
    };
  }
};

export default ResponseMiddleware;
