import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect-db";

export class Thumbnail extends Model {
  declare id: number;
  declare variant: number;
  declare size: number;
  declare filePath: string;
  declare width: number;
  declare height: number;
  declare format: string;
}

Thumbnail.init(
  {
    variant: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
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
