import dotenv from "dotenv";
dotenv.config();
import Koa from "koa";
import koaBody from "koa-body";
import index from "./router/index";
import user from "./router/user";
import type { Server } from "http";
import AccessLogMiddleWare from "./middleware/AccessLogMiddleware";
import ErrorLoggingMiddleware from "./middleware/ErrorLogMiddleware";
import ResponseMiddleware from "./middleware/ResponseMiddleware";
import db from "./db";
import path from "path";

db(); // 初始化数据库
const app = new Koa();
app.use(ErrorLoggingMiddleware);
app.use(ResponseMiddleware);
app.use(
  koaBody({
    // 可选配置项
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, "/uploads"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
    },
    urlencoded: true, // 解析 urlencoded 请求体
    json: true, // 解析 JSON 请求体
    text: true, // 解析文本请求体
  })
);

app.use(AccessLogMiddleWare);
app.use(index.routes());
app.use(user.routes());

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
