import Router from "koa-router";
import PhotoController from "./controllers/photos";
import ScanController from "./controllers/scan";

const photoRouter = new Router({ prefix: "/api/v1/photos" });
const scanRouter = new Router({ prefix: "/api/v1/scan" });

photoRouter.get("/", PhotoController.getAllPhotos);
photoRouter.get("/:id", PhotoController.getPhoto);
photoRouter.get("/:id/thumbnail", PhotoController.getPhotoThumbnail);
scanRouter.post("/", ScanController.scan);

export { photoRouter, scanRouter };
