import Koa from "koa";
import router from "./router";
import dotenv from "dotenv";
import type { Server } from "http";
import AccessLogMiddleWare from "./middleware/AccessLogMiddleware";
import ErrorLoggingMiddleware from "./middleware/ErrorLogMiddleware";
dotenv.config();

const app = new Koa();
app.use(ErrorLoggingMiddleware);
app.use(AccessLogMiddleWare);
app.use(router.routes());

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
