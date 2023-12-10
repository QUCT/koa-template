import { Context } from "koa";
import UserService from "../service/UserService";
import { sign } from "../../utils/auth";
import { Rules } from "async-validator";
import validate from "../../utils/validate";

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
    const rules: Rules = {
      name: [
        {
          type: "string",
          required: true,
          message: "用户名不能为空",
        },
      ],
    };
    interface Iadmin {
      name: string;
      password: string;
    }
    const { data, error } = await validate<Iadmin>(ctx, rules);
    if (error !== null) {
      ctx.body = error;
      ctx.businessCode = 400;
    }
    // return (ctx.message = "成功");
  }
}

export default new UserController();
