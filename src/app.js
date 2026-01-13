import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes.js";
import { errorHandler } from "./shared/middlewares/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

/* ======================
   🔐 TRUST PROXY (REQUIRED ON RENDER)
   ====================== */
// Allows express-rate-limit to correctly read X-Forwarded-For
app.set("trust proxy", 1);

/* ======================
   Global Middlewares
   ====================== */

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== "production") {
  app.use(morgan("dev"));
}

/* ======================
   Health Check
   ====================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/* ======================
   API Routes
   ====================== */

app.use("/api", routes);

/* ======================
   404 Handler
   ====================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================
   Global Error Handler
   ====================== */

app.use(errorHandler);

export default app;
