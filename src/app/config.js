const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);

dotenv.config();

module.exports = {
  APP_PORT,
  APP_HOST,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_USER,
  MYSQL_DATABASE,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
