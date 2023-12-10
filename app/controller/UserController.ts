import { Context } from "koa";
import UserService from "../service/UserService";
import { sign } from "../../utils/auth";

class UserController {
  async signin(ctx: Context) {
    const { userName, email, password } = ctx.request.body;
    await UserService.createUser({ userName, email, password });
  }

  async login(ctx: Context) {
    const { userName, password } = ctx.request.body;
    const user: any = await UserService.login({ userName, password });
    // 遗漏逻辑 判断用户是否有效且存在，不存在的话返回400和错误信息
    ctx.body = {
      token: sign({
        user_id: user[0]["user_id"],
      }),
    };
  }

  async test(ctx: Context) {
    ctx.body = [11111111];
    ctx.message = "gogogogog";
  }
}

export default new UserController();
