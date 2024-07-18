import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect-db";

export class Thumbnail extends Model {
  declare id: number;
  declare filePath: string;
  declare width: number;
  declare height: number;
  declare format: string;
}

Thumbnail.init(
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
    width: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    height: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);
