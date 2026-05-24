import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import "./models"; // register all Mongoose models before routes use them
import categoriesRouter from "./routes/categories";
import articlesRouter from "./routes/articles";
import trendingRouter from "./routes/trending";
import tagsRouter from "./routes/tags";
import newsletterRouter from "./routes/newsletter";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/categories", categoriesRouter);
app.use("/api/articles",   articlesRouter);
app.use("/api/trending",   trendingRouter);
app.use("/api/tags",       tagsRouter);
app.use("/api/newsletter", newsletterRouter);

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
