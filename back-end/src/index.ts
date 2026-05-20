import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`[server] Running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("[server] Failed to connect to DB, shutting down:", err);
    process.exit(1);
  });
