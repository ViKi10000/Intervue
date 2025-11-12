import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

// import connectDB from "../dbConnect";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.send("api is up and running.");
});

app.get("/books", (req, res) => {
  res.send("this is the books endpoint");
});

// connectDB();

//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on PORT:${ENV.PORT}🌎`);
    });
  } catch (error) {
    console.error("Failed to start server:🏴‍☠️🏴‍☠️🏴‍", error);
  }
};

startServer();
