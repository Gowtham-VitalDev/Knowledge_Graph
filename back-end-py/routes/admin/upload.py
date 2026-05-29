import os
import mimetypes
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from typing import Optional
from middleware.auth import require_admin
from gcs import upload_file, upload_files, delete_file, list_files

# All routes here require admin JWT — same pattern as admin/articles.py
router = APIRouter(dependencies=[Depends(require_admin)])

# Max file size: 10 MB
MAX_FILE_SIZE = 10 * 1024 * 1024

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"}


def _validate_image(file: UploadFile, size: int) -> None:
    if size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"{file.filename}: exceeds 10 MB limit")
    ct = file.content_type or mimetypes.guess_type(file.filename or "")[0] or ""
    if ct not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"{file.filename}: unsupported type '{ct}'")


def _destination(folder: str, filename: str) -> str:
    """Build GCS path: e.g. articles/my-slug/hero.png"""
    safe = filename.replace(" ", "-").lower()
    return f"{folder.strip('/')}/{safe}"


# ── POST /api/admin/upload ────────────────────────────────────────────────────
# Single image upload.
# Query param `folder` lets the caller organise images:
#   /api/admin/upload?folder=articles/my-slug
#   /api/admin/upload?folder=topics

@router.post("/admin/upload")
async def upload_single(
    file:   UploadFile = File(...),
    folder: str        = Query("uploads", description="GCS folder path"),
):
    data = await file.read()
    _validate_image(file, len(data))

    destination  = _destination(folder, file.filename or "image")
    content_type = file.content_type or "application/octet-stream"
    url          = await upload_file(data, destination, content_type)

    return {"url": url, "destination": destination}


# ── POST /api/admin/upload/bulk ───────────────────────────────────────────────
# Bulk upload — up to 20 images in one request.
# Usage: multipart/form-data with multiple `files` fields.

@router.post("/admin/upload/bulk")
async def upload_bulk(
    files:  list[UploadFile] = File(...),
    folder: str              = Query("uploads", description="GCS folder path"),
):
    if len(files) > 20:
        raise HTTPException(status_code=400, detail="Maximum 20 files per bulk upload")

    payloads = []
    for f in files:
        data = await f.read()
        _validate_image(f, len(data))
        dest = _destination(folder, f.filename or "image")
        ct   = f.content_type or "application/octet-stream"
        payloads.append((data, dest, ct))

    urls = await upload_files(payloads)

    return {
        "uploaded": [
            {"url": url, "destination": dest}
            for url, (_, dest, _) in zip(urls, payloads)
        ]
    }


# ── DELETE /api/admin/upload ──────────────────────────────────────────────────
# Delete a single image by its GCS destination path.
# Body: { "destination": "articles/my-slug/hero.png" }

@router.delete("/admin/upload")
async def delete_image(destination: str = Query(..., description="GCS path to delete")):
    await delete_file(destination)
    return {"ok": True, "deleted": destination}


# ── GET /api/admin/images ─────────────────────────────────────────────────────
# Browse all uploaded images, optionally filtered by folder prefix.
# Useful for an image picker in the article editor.

@router.get("/admin/images")
async def list_images(prefix: str = Query("", description="Filter by folder prefix")):
    files = await list_files(prefix=prefix)
    return {"images": files, "total": len(files)}
