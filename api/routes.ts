import Router from "koa-router";
import PhotoController from "./controllers/photo";
import ScanController from "./controllers/scan";

const photoRouter = new Router({ prefix: "/api/v1/photo" });
const scanRouter = new Router({ prefix: "/api/v1/scan" });

photoRouter.get("/", PhotoController.getPhotos);
scanRouter.post("/", ScanController.scan);

export { photoRouter, scanRouter };
