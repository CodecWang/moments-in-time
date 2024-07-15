import fs from "fs";
import { Sequelize } from "sequelize";
// import YAML from "yaml";

// import { ENV_CONFIG } from "./constant";

interface EnvConfig {
  mysql: {
    host: string;
    database: string;
    username: string;
    password: string;
    port: number;
  };
}

function getEnvConfig(): EnvConfig {
  // const file = fs.readFileSync(ENV_CONFIG, 'utf8');
  // return YAML.parse(file);

  return {
    mysql: {
      host: "localhost",
      database: "moments",
      username: "root",
      password: "12345",
      port: 3306,
    },
  };
}

const { mysql } = getEnvConfig();
const { host, database, username, password, port } = mysql;
const db = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  timezone: "+08:00",
  logQueryParameters: true,
});

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export { db };
