import { config } from "dotenv";
import { connect, connection } from "mongoose";

config();

const { MDB_DATABASE, MDB_USER, MDB_PASS, MDB_CLUSTER } = process.env;

const URI_DB = `mongodb+srv://${MDB_USER}:${MDB_PASS}@${MDB_CLUSTER}/${MDB_DATABASE}?retryWrites=true&w=majority`;

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
