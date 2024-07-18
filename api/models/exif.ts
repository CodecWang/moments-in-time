import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect-db";

export class Exif extends Model {
  declare id: number;
  declare shotTime: Date;
  declare cameraMake: string;
  declare cameraModel: string;
  declare iso: number;
  declare gpsLatitude: number;
  declare gpsLongitude: number;
}

Exif.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shotTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cameraMake: DataTypes.CHAR(50),
    cameraModel: DataTypes.CHAR(50),
    iso: DataTypes.SMALLINT,
    gpsLatitude: DataTypes.FLOAT,
    gpsLongitude: DataTypes.FLOAT,
  },
  {
    sequelize,
    underscored: true,
  }
);
