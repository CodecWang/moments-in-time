import { Context } from "koa";

export default class PhotoController {
  public static async getPhotos(ctx: Context) {
    ctx.body = {
      users: [
        {
          name: "Tom",
          age: 25,
        },
        {
          name: "Jerry",
          age: 22,
        },
      ],
    };
  }

  public static async notify(ctx: Context) {
    const { req, res } = ctx;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // 确保响应被发送到客户端

    // 示例函数，模拟异步操作完成后发送通知
    function notifyClient(message: any) {
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    }

    // 模拟异步操作
    setTimeout(() => {
      notifyClient("File scan completed!");
    }, 5000);

    req.on("close", () => {
      console.log("Client disconnected");
    });
  }
}
