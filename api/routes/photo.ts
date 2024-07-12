import Router from "koa-router";
import PhotoController from "../controllers/photo";

const router = new Router({
  prefix: "/api/v1/photo",
});

router.get("/", PhotoController.getPhotos);

export default router;
