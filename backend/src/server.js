import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    // credentials: true, meaning?? => server allows cookies to be sent along with requests
  })
);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: functions,
  })
);

app.get("/health", (req, res) => {
  res.send("api is up and running.");
});

app.get("/books", (req, res) => {
  res.send("this is the books endpoint");
});

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
