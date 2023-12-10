import AuthMiddleware from "../middleware/AuthMiddleware";
import UserController from "../controller/UserController";
import koaRouter from "koa-router";

const router = new koaRouter({ prefix: "/user" });

router.post("/signin", UserController.signin);

router.post("/login", UserController.login);

router.get("/logout");

router.get("/test", AuthMiddleware, UserController.test);

export default router;
