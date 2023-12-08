import { Context } from "koa";
class IndexController {
  async index(ctx: Context) {
    // throw new Error("1111");
    return (ctx.body = "ccccccc");
  }
}

export default new IndexController();
