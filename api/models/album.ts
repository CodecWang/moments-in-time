import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect-db";
import { Photo } from "./photo";

export class Album extends Model {
  declare id: number;
  declare title: string;

  declare addPhotos: (photoIds: Photo[]) => Promise<void>;
}

Album.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);
