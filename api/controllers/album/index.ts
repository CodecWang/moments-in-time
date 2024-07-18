import { Context } from "koa";
import { Album, Photo } from "../../models";

export default class AlbumController {
  public static async getAllAlbums(ctx: Context) {
    ctx.body = await Album.findAll();
  }

  public static async createAlbum(ctx: Context) {
    const { title } = ctx.request.body;
    ctx.body = await Album.create({ title });
  }

  public static async addAlbumPhotos(ctx: Context) {
    const id = ctx.params.id;

    const { photoIds } = ctx.request.body;
    const album = await Album.findByPk(id);

    if (!album) {
      ctx.status = 404;
      ctx.body = "Album not found";
      return;
    }

    await album.addPhotos(photoIds);
    ctx.body = album;
  }

  public static async getAlbumPhotos(ctx: Context) {
    const id = ctx.params.id;
    ctx.body = await Album.findByPk(id, {
      include: {
        model: Photo,
        as: "photos",
        through: { attributes: [] },
        include: [Photo.Exif, Photo.Thumbnail],
      },
    });
  }
}
