import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import { config } from "dotenv";
import { router } from "./routes";
import { errorHandler, logErrors } from "./middlewares/error.handler";
import { connectDB } from "./database";

config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;
const whiteList: string[] = ["http://127.0.0.1:5500"];

const options: CorsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(<string>origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(options));
app.use(express.json());

router(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
