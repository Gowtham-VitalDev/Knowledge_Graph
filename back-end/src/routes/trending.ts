import { Router, Request, Response } from "express";
import { TrendingRanking } from "../models/TrendingRanking";

const router = Router();

// GET /api/trending?category=<id>
// Returns the current week's trending rankings
router.get("/", async (req: Request, res: Response) => {
  try {
    // Find the most recent weekStartDate
    const latest = await TrendingRanking.findOne().sort({ weekStartDate: -1 }).select("weekStartDate");

    if (!latest) {
      res.json({ data: [] });
      return;
    }

    const filter: Record<string, unknown> = { weekStartDate: latest.weekStartDate };
    if (req.query.category) filter.categoryId = req.query.category;

    const rankings = await TrendingRanking.find(filter)
      .sort({ rank: 1 })
      .limit(10)
      .populate({
        path: "articleId",
        select: "title slug readTime views authorId categoryId",
        populate: [
          { path: "authorId", select: "fullName username" },
          { path: "categoryId", select: "name slug" },
        ],
      });

    res.json({ data: rankings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending" });
  }
});

export default router;
