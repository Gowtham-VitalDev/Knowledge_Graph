import { Router, Request, Response } from "express";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber";

const router = Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req: Request, res: Response) => {
  const { email, source } = req.body as { email?: string; source?: string };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const validSources = ["homepage", "footer", "popup"] as const;
  const resolvedSource = validSources.includes(source as typeof validSources[number])
    ? (source as typeof validSources[number])
    : "homepage";

  try {
    const existing = await NewsletterSubscriber.findOne({ email });

    if (existing) {
      if (existing.isActive) {
        res.status(409).json({ error: "Already subscribed" });
        return;
      }
      // Re-subscribe
      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      existing.subscribedAt = new Date();
      await existing.save();
      res.json({ message: "Re-subscribed successfully" });
      return;
    }

    await NewsletterSubscriber.create({ email, source: resolvedSource });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router;
