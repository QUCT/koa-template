import UserService from "../service/UserService";
import { Context } from "koa";
class IndexController {
  async index(ctx: Context) {
    // throw new Error("1111");
    // const user = await UserService.getService();
    return (ctx.body = 1111111);
  }
}

export default new IndexController();
