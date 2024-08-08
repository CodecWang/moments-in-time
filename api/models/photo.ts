import { DataTypes, HasMany, HasOne, Model } from "sequelize";
import { sequelize } from "../connect-db";

export class Photo extends Model {
  declare id: number;
  declare filePath: string;
  declare checkSum: string;
  declare shotTime: Date;
  declare modifiedTime: Date;

  static Exif: HasOne;
  static Thumbnail: HasMany;
}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    checkSum: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    blurHash: {
      type: DataTypes.CHAR(28),
    },
    shotTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modifiedTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);
