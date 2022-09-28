import { config } from "dotenv";
import { connect, connection } from "mongoose";

config();

const { USER_DB, PASS_DB, NAME_DB, CLUSTER_DB_URI } = process.env;

const URI_DB = `mongodb+srv://${USER_DB}:${PASS_DB}@${CLUSTER_DB_URI}/${NAME_DB}?retryWrites=true&w=majority`;

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
