import { Album } from "./album";
import { AlbumPhoto } from "./album-photo";
import { Exif } from "./exif";
import { Photo } from "./photo";
import { Thumbnail } from "./thumbnail";

Album.belongsToMany(Photo, {
  through: AlbumPhoto,
  as: "photos",
});
Photo.belongsToMany(Album, {
  through: AlbumPhoto,
  as: "albums",
});

Photo.hasOne(Exif, { foreignKey: "photoId", as: "exif" });
Exif.belongsTo(Photo, { foreignKey: "photoId" });

Photo.Thumbnail = Photo.hasMany(Thumbnail, {
  foreignKey: "photoId",
  as: "thumbnails",
});
Thumbnail.belongsTo(Photo, { foreignKey: "photoId" });

export { Album, AlbumPhoto, Exif, Photo, Thumbnail };
