import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Motor creates an async MongoDB client.
# We store it at module level so every route can import `db` and use it directly.
# This is the Python equivalent of mongoose.connect() in the Node backend.

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017")
DB_NAME   = os.getenv("DB_NAME", "knowledgegraph")

client: AsyncIOMotorClient = None  # type: ignore
db = None


def connect_db():
    """Called once on app startup. Creates the Motor client and selects the DB."""
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    print(f"[db] Connected to MongoDB — database: {DB_NAME}")


def close_db():
    """Called once on app shutdown. Closes the connection cleanly."""
    global client
    if client:
        client.close()
        print("[db] MongoDB connection closed")


# Shorthand accessors — import these in route files instead of importing `db` directly.
# Usage: from database import articles_col
def get_collection(name: str):
    return db[name]
