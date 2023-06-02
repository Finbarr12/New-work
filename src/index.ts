import express, { Application } from "express";
import { DBConnect } from "../config/db";
import router from "../router/router";
import cors from "cors";

const app: Application = express();
const Port = 1112;

app.use(express.json());
app.use(cors());
app.use("/api", router);

DBConnect();

app.listen(Port, () => {
  console.log("Up and running");
});
