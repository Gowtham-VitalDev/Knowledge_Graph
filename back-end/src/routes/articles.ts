import { Router, Request, Response } from "express";
import { Article } from "../models/Article";

const router = Router();

// GET /api/articles?category=<id>&page=1&limit=10&status=published
router.get("/", async (req: Request, res: Response) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit  = Math.min(50, parseInt(req.query.limit as string) || 10);
    const skip   = (page - 1) * limit;

    const filter: Record<string, unknown> = { status: "published" };
    if (req.query.category) filter.categoryId = req.query.category;

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("categoryId", "name slug colorCode")
        .populate("tagIds", "name slug")
        .populate("authorId", "fullName username avatarUrl"),
      Article.countDocuments(filter),
    ]);

    res.json({
      data: articles,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[articles] GET /:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// GET /api/articles/:slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, status: "published" })
      .populate("categoryId", "name slug colorCode")
      .populate("tagIds", "name slug")
      .populate("authorId", "fullName username avatarUrl bio socialLinks");

    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    // Increment views without waiting for it
    Article.updateOne({ _id: article._id }, { $inc: { views: 1 } }).exec();

    res.json({ data: article });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

export default router;
