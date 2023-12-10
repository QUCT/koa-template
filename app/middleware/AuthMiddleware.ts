import { Context, Next } from "koa";
import { verify } from "../../utils/auth";

const AuthMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.headers["authorization"];

  if (token == null) {
    // 未授权
    ctx.body = {
      message: "无效权限",
      success: false,
      code: 401,
    };
    ctx.status = 401;
    return; // 返回错误码并且停止中间件继续next
  }
  try {
    const { error, user } = verify(token);
    if (error) {
      ctx.body = {
        message: "鉴权失败",
        success: false,
        code: 403,
      };
      ctx.status = 403;
      return;
    }
  } catch (e) {
    ctx.body = {
      message: "鉴权异常",
      success: false,
      code: 403,
    };
    ctx.status = 403;
    return;
  }
  await next();
};

export default AuthMiddleware;
