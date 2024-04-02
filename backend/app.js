import express from "express";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", authRoute);

export default app;
