import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import connect_db, close_db

load_dotenv()

# ── LIFESPAN ──────────────────────────────────────────────────────────────────
# This replaces connectDB().then(() => app.listen()) from Express.
# Code before `yield` runs on startup. Code after `yield` runs on shutdown.
# FastAPI guarantees DB is connected before any request is handled.

@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_db()          # startup
    yield
    close_db()            # shutdown


# ── APP ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="KnowledgeGraph API",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Same as: app.use(cors({ origin: CLIENT_ORIGIN, credentials: true })) in Express
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CLIENT_ORIGIN", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── HEALTH CHECK ──────────────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok"}

# ── ROUTERS ───────────────────────────────────────────────────────────────────
# include_router is FastAPI's equivalent of app.use("/api", router) in Express.
# prefix="/api" means every route inside the router gets /api prepended automatically.

from routes.articles         import router as articles_router
from routes.categories       import router as categories_router
from routes.tags             import router as tags_router
from routes.trending         import router as trending_router
from routes.auth             import router as auth_router
from routes.google_auth      import router as google_auth_router
from routes.newsletter       import router as newsletter_router
from routes.bookmarks        import router as bookmarks_router
from routes.admin.articles   import router as admin_articles_router
from routes.admin.upload     import router as admin_upload_router

app.include_router(articles_router,       prefix="/api")
app.include_router(categories_router,     prefix="/api")
app.include_router(tags_router,           prefix="/api")
app.include_router(trending_router,       prefix="/api")
app.include_router(auth_router,           prefix="/api")
app.include_router(google_auth_router,    prefix="/api")
app.include_router(newsletter_router,     prefix="/api")
app.include_router(bookmarks_router,      prefix="/api")
app.include_router(admin_articles_router, prefix="/api")
app.include_router(admin_upload_router,   prefix="/api")
