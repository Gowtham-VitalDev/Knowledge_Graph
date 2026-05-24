import { Router, Request, Response } from "express";
import { Tag } from "../models/Tag";

const router = Router();

// GET /api/tags — returns all tags sorted by usageCount desc
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tags = await Tag.find().sort({ usageCount: -1 });
    res.json({ data: tags });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

export default router;
