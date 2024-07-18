import { Context } from "koa";
import path from "path";
import { promises as fs } from "fs";
import { Photo, Thumbnail } from "../../models";

export default class PhotoController {
  public static async getAllPhotos(ctx: Context) {
    ctx.body = await Photo.findAll({
      include: [Photo.Exif, Photo.Thumbnail],
    });
  }

  public static async getPhoto(ctx: Context) {
    const id = ctx.params.id;
    ctx.body = await Photo.findByPk(id, {
      include: [Photo.Exif, Photo.Thumbnail],
    });
  }

  public static async getPhotoThumbnail(ctx: Context) {
    const id = ctx.params.id;
    // const size = ctx.query.size;

    const thumbnail = await Thumbnail.findOne({ where: { photoId: id } });

    if (!thumbnail) {
      ctx.status = 404;
      ctx.body = "Thumbnail not found";
      return;
    }

    const imagePath = path.join(
      "/Users/arthur/coding/moments-in-time/photos/thumbnails",
      thumbnail.filePath
    );

    await fs.access(imagePath, fs.constants.F_OK);
    const data = await fs.readFile(imagePath);
    ctx.type = `image/${thumbnail.format}`;
    ctx.body = data;
  }
}
