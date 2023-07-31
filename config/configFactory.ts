import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

const defaults = {
  root: path.normalize(__dirname + "/.."),
  port: 3000,
};

const development = {
  root: path.normalize(__dirname + "/.."),
  port: 3000,
  db: "mongodb://localhost:27017/bookapp",
  accessControlAllowOrigin: "*",
  config: "development",
};
const production = {
  root: path.normalize(__dirname + "/.."),
  port: 3000,
  db: "mongodb://bookapp:541851210@server.bookapp.com",
  accessControlAllowOrigin: "*",
  config: "production",
};
const test = {
  root: path.normalize(__dirname + "/.."),
  port: 3000,
  db: "mongodb://bookapp:541851210@server.bookapp.com",
  accessControlAllowOrigin: "*",
  config: "test",
};

const config = (environment: "development", mongoDbUri?: string) => {
  const selectedConfig = {
    development,

    production,
  }[environment];
  if (mongoDbUri) selectedConfig!.db = mongoDbUri;
  return selectedConfig;
};
export default config;
