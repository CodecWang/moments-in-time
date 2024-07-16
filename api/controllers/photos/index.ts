import { Context } from "koa";
import { readJsonFile } from "../../db";
import path from "path";
import { promises as fs } from "fs";
import { DB_PHOTO_JSON, DB_THUMBNAIL_JSON } from "../../configs";

export default class PhotoController {
  public static async getAllPhotos(ctx: Context) {
    console.time("executionTime");

    const dbFiles = await readJsonFile(DB_PHOTO_JSON);
    ctx.body = dbFiles;

    console.timeEnd("executionTime");
  }

  public static async getPhoto(ctx: Context) {
    console.time("executionTime");

    const dbFiles = (await readJsonFile(DB_PHOTO_JSON)) as Photo[];
    const id = ctx.params.id;
    const photo = dbFiles.find((item) => item.id === id);
    ctx.body = photo;

    console.timeEnd("executionTime");
  }

  public static async getPhotoThumbnail(ctx: Context) {
    console.time("executionTime");

    const id = ctx.params.id;
    const size = ctx.query.size;

    const dbThumbnails = (await readJsonFile(DB_THUMBNAIL_JSON)) as Thumbnail[];
    const thumbnail = dbThumbnails.find((item) => item.photoID === id);
    if (!thumbnail) {
      ctx.status = 404;
      ctx.body = "Thumbnail not found";
      return;
    }

    const imagePath = path.join(
      "/Users/arthur/coding/moments-in-time/photos/thumbnails",
      thumbnail.filename
    );

    await fs.access(imagePath, fs.constants.F_OK);
    const data = await fs.readFile(imagePath);
    ctx.type = `image/${thumbnail.format}`;
    ctx.body = data;
  }
}
