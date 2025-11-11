import express from "express";
import { ENV } from "./lib/env.js";

// import connectDB from "../dbConnect";

const app = express();

app.get("/health", (req, res) => {
  res.send("api is up and running.");
});

// connectDB();

app.listen(ENV.PORT, () => {
  console.log(`Server is running on PORT:${ENV.PORT}`);
});
