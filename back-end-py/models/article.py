from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ── BASE ──────────────────────────────────────────────────────────────────────
# MongoDB returns `_id` as an ObjectId. The frontend expects a plain string `_id`.
# This base config tells Pydantic to:
#   1. Accept ObjectId and convert it to string automatically
#   2. Populate fields from the MongoDB document's field names (not Python attr names)

class MongoBase(BaseModel):
    model_config = {
        "populate_by_name": True,       # allow field aliases to be used by name too
        "arbitrary_types_allowed": True, # allow ObjectId type
    }


# ── NESTED MODELS ─────────────────────────────────────────────────────────────
# When a route populates (joins) related documents, these are the shapes
# of those nested objects inside an article response.

class AuthorNested(MongoBase):
    id: Optional[str] = Field(None, alias="_id")
    fullName: str = ""
    username: str = ""
    avatarUrl: str = ""
    bio: Optional[str] = None


class CategoryNested(MongoBase):
    id: Optional[str] = Field(None, alias="_id")
    name: str = ""
    slug: str = ""
    colorCode: str = ""


class TagNested(MongoBase):
    id: Optional[str] = Field(None, alias="_id")
    name: str = ""
    slug: str = ""


# ── ARTICLE RESPONSE ──────────────────────────────────────────────────────────
# This is what the API returns for a single article.
# Matches exactly what the frontend's ApiArticle interface expects.

class ArticleResponse(MongoBase):
    id: Optional[str]              = Field(None, alias="_id")
    slug: str                      = ""
    title: str                     = ""
    excerpt: str                   = ""
    content: str                   = ""
    coverImage: str                = ""
    categoryId: Optional[CategoryNested] = None
    tagIds: list[TagNested]        = []
    authorId: Optional[AuthorNested]    = None
    status: str                    = "draft"
    featured: bool                 = False
    trendingScore: int             = 0
    readTime: int                  = 0
    views: int                     = 0
    likes: int                     = 0
    shares: int                    = 0
    bookmarks: int                 = 0
    publishedAt: Optional[datetime] = None


# ── CATEGORY & TAG RESPONSES ──────────────────────────────────────────────────

class CategoryResponse(MongoBase):
    id: Optional[str]   = Field(None, alias="_id")
    name: str           = ""
    slug: str           = ""
    description: str    = ""
    icon: str           = ""
    colorCode: str      = ""
    articleCount: int   = 0


class TagResponse(MongoBase):
    id: Optional[str]  = Field(None, alias="_id")
    name: str          = ""
    slug: str          = ""
    usageCount: int    = 0


# ── TRENDING RESPONSE ─────────────────────────────────────────────────────────

class TrendingArticleNested(MongoBase):
    id: Optional[str]   = Field(None, alias="_id")
    title: str          = ""
    slug: str           = ""
    readTime: int       = 0
    views: int          = 0
    authorId: Optional[AuthorNested]   = None
    categoryId: Optional[CategoryNested] = None


class TrendingResponse(MongoBase):
    id: Optional[str]   = Field(None, alias="_id")
    rank: int           = 0
    score: int          = 0
    articleId: Optional[TrendingArticleNested] = None
