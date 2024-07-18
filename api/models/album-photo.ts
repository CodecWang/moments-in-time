import { Model } from "sequelize";
import { sequelize } from "../connect-db";

export class AlbumPhoto extends Model {}

AlbumPhoto.init(
  {},
  {
    sequelize,
    underscored: true,
  }
);
