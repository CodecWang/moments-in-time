import Koa from "koa";
import Router from "koa-router";
// import bodyParser from "koa-bodyparser";
// import serve from "koa-static";

import photoRoutes from "./routes/photo";
import scannerRoutes from "./routes/scan";

const app = new Koa();
const router = new Router();

// 设置静态文件目录
// app.use(serve(__dirname + "/public"));

// // 解析请求体
// app.use(bodyParser());

// 设置路由
router.get("/", async (ctx) => {
  ctx.body = "Hello, Koa with TypeScript!";
});

app.use(photoRoutes.routes()).use(photoRoutes.allowedMethods());
app.use(scannerRoutes.routes()).use(scannerRoutes.allowedMethods());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
