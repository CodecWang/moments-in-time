import Router from "koa-router";
import PhotoController from "./controllers/photo";
import ScanController from "./controllers/scan";
import AlbumController from "./controllers/album";

const photoRouter = new Router({ prefix: "/api/v1/photos" });
const scanRouter = new Router({ prefix: "/api/v1/scan" });
const albumRouter = new Router({ prefix: "/api/v1/albums" });

scanRouter.post("/", ScanController.scan);

photoRouter.delete("/", PhotoController.deletePhotos);
photoRouter.get("/", PhotoController.getAllPhotos);
photoRouter.get("/:id", PhotoController.getPhoto);

photoRouter.get("/:id/thumbnail", PhotoController.getPhotoThumbnail);

albumRouter.post("/", AlbumController.createAlbum);
albumRouter.delete("/", AlbumController.deleteAlbums);
albumRouter.put("/:id", AlbumController.updateAlbum);
albumRouter.get("/", AlbumController.getAllAlbums);

albumRouter.get("/:id/photos", AlbumController.getAlbumPhotos);
albumRouter.post("/:id/photos", AlbumController.addAlbumPhotos);

export { photoRouter, scanRouter, albumRouter };
