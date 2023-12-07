import express, { Request, Response } from "express";
require("dotenv").config();
import { connect } from "./db/connect";
import userRouter from "./routers/user";
import vehicleRouter from "./routers/vehicle";

const app = express();

connect();

app.use(express.json());
app.use("/user", userRouter);
app.use("/vehicle", vehicleRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not valid" });
});

module.exports = app;
