import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set in environment variables");

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri);
      console.log(`[db] Connected to MongoDB (attempt ${attempt})`);
      return;
    } catch (err) {
      console.error(`[db] Connection attempt ${attempt} failed:`, err);
      if (attempt === MAX_RETRIES) throw err;
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
    }
  }
}

mongoose.connection.on("disconnected", () =>
  console.warn("[db] MongoDB disconnected")
);
mongoose.connection.on("reconnected", () =>
  console.log("[db] MongoDB reconnected")
);
