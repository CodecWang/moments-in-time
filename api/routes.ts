import Router from "koa-router";
import PhotoController from "./controllers/photo";
import ScanController from "./controllers/scan";
import AlbumController from "./controllers/album";

const photoRouter = new Router({ prefix: "/api/v1/photos" });
const scanRouter = new Router({ prefix: "/api/v1/scan" });
const albumRouter = new Router({ prefix: "/api/v1/albums" });

photoRouter.get("/", PhotoController.getAllPhotos);
photoRouter.get("/:id", PhotoController.getPhoto);
photoRouter.get("/:id/thumbnail", PhotoController.getPhotoThumbnail);
scanRouter.post("/", ScanController.scan);

albumRouter.post("/", AlbumController.createAlbum);
albumRouter.get("/:id/photos", AlbumController.getAlbumPhotos);
albumRouter.post("/:id/photos", AlbumController.addAlbumPhotos);

export { photoRouter, scanRouter, albumRouter };
