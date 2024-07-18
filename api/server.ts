import Koa from "koa";
import Router from "koa-router";
import { albumRouter, photoRouter, scanRouter } from "./routes";
import bodyParser from "koa-bodyparser";
// import serve from "koa-static";

const app = new Koa();
const router = new Router();

// 设置静态文件目录
// app.use(serve(__dirname + "/public"));

app.use(bodyParser());

// 设置路由
router.get("/", async (ctx) => {
  ctx.body = "Hello, Koa with TypeScript!";
});

app.use(photoRouter.routes()).use(photoRouter.allowedMethods());
app.use(scanRouter.routes()).use(scanRouter.allowedMethods());
app.use(albumRouter.routes()).use(albumRouter.allowedMethods());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
