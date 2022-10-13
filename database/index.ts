import { connect, connection } from "mongoose";
import { conf } from "../config/config";

const URI_DB = conf.uriDB;

export const connectDB = async () => {
  try {
    const conn = await connect(URI_DB, {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });

    console.log("Connected to DB", conn.connection.db.databaseName);
  } catch (error) {
    console.error("Error on connection DB", error);
  }
};

connection.on("disconnected", (err) => {
  console.error("Disconnected from DB", err);
});
