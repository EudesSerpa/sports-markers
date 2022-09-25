import express, { Express } from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
router(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
