import { Context } from "koa";
import path from "path";
import { promises as fs } from "fs";
import { Exif, Photo, Thumbnail } from "../../models";

export default class PhotoController {
  public static async getAllPhotos(ctx: Context) {
    ctx.body = await Photo.findAll({
      include: [
        {
          model: Exif,
          as: "exif",
        },
        {
          model: Thumbnail,
          as: "thumbnails",
        },
      ],
    });
  }

  public static async deletePhotos(ctx: Context) {
    const { photoIds } = ctx.request.body;
    await Photo.destroy({ where: { id: photoIds } });
    ctx.body = "Photos deleted";
  }

  public static async getPhoto(ctx: Context) {
    const id = ctx.params.id;
    ctx.body = await Photo.findByPk(id, {
      include: [
        {
          model: Exif,
          as: "exif",
        },
        {
          model: Thumbnail,
          as: "thumbnails",
        },
      ],
    });
  }

  public static async deletePhoto(ctx: Context) {
    const id = ctx.params.id;
    const photo = await Photo.findByPk(id);

    if (!photo) {
      ctx.status = 404;
      ctx.body = "Photo not found";
      return;
    }

    await photo.destroy();
    ctx.body = "Photo deleted";
  }

  public static async getPhotoThumbnail(ctx: Context) {
    const id = ctx.params.id;
    const variant = ctx.query.variant;

    const thumbnail = await Thumbnail.findOne({
      where: { photoId: id, variant },
    });

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
