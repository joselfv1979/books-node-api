import dotenv from "dotenv";
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `./../../.env`),
});

const {
  PROD_PORT,
  PROD_HOST,
  PROD_DB_CONN_STRING,
  DEV_HOST,
  DEV_PORT,
  DEV_DB_CONN_STRING,
} = process.env;

const NODE_ENV = process.env.NODE_ENV;

const HOST = NODE_ENV === "development" ? DEV_HOST : PROD_HOST;
const PORT = NODE_ENV === "development" ? DEV_PORT : PROD_PORT;
const DB_CONN_STRING =
  NODE_ENV === "development" ? DEV_DB_CONN_STRING : PROD_DB_CONN_STRING;

export { NODE_ENV, HOST, PORT, DB_CONN_STRING };
