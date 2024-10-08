// import fs from "fs";
import { Sequelize } from "sequelize";
// import YAML from "yaml";

// import { ENV_CONFIG } from "./constant";

// interface EnvConfig {
//   db: {
//     host: string;
//     database: string;
//     username: string;
//     password: string;
//     port: number;
//   };
// }

function getEnvConfig() {
  // const file = fs.readFileSync(ENV_CONFIG, "utf8");
  // return YAML.parse(file);
  return {
    dbConfig: {
      host: "localhost",
      database: "echo",
      username: "root",
      password: "123456",
      port: 3306,
    },
  };
}

const { dbConfig } = getEnvConfig();
const { host, database, username, password, port } = dbConfig;
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  timezone: "+08:00",
  logQueryParameters: true,
  // logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { sequelize };
