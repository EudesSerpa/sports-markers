import { config } from "dotenv";

config();

const {
  NODE_ENV,
  PORT,
  MDB_DATABASE,
  MDB_USER,
  MDB_PASS,
  MDB_CLUSTER,
  JWT_SECRET_KEY,
} = process.env;

export const conf = {
  env: NODE_ENV || "dev",
  isProd: NODE_ENV === "production",
  port: PORT || 3000,
  uriDB: `mongodb+srv://${MDB_USER}:${MDB_PASS}@${MDB_CLUSTER}/${MDB_DATABASE}?retryWrites=true&w=majority`,
  jwtKey: JWT_SECRET_KEY,
};
