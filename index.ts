import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import passport from "passport";
import { errorHandler, logErrors } from "./middlewares/error.handler";
import { connectDB } from "./database";
import { router } from "./routes";
import { conf } from "./config/config";
import "./utils/auth/index";

connectDB();

const app: Express = express();
const port = conf.port;
const whiteList: string[] = ["http://127.0.0.1:5173"];

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
app.use(passport.initialize());

router(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
