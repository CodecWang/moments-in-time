import Router from "koa-router";
import ScannerController from "../controllers/scan";

const router = new Router({
  prefix: "/api/v1/scan",
});

router.post("/", ScannerController.scan);

export default router;
