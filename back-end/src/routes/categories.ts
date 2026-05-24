import { Router, Request, Response } from "express";
import { Category } from "../models/Category";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ data: categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;
