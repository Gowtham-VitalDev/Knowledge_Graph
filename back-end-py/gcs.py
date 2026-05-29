import os
import asyncio
from typing import Optional
from google.cloud import storage
from google.oauth2 import service_account

# ── CLIENT ────────────────────────────────────────────────────────────────────
# GCS_KEY_PATH  → path to a service account JSON key file (local dev / CI)
# When running on Cloud Run with Workload Identity, leave GCS_KEY_PATH unset —
# the client picks up the instance's service account automatically.

GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "kg-article-images")
GCS_KEY_PATH    = os.getenv("GCS_KEY_PATH", "")  # empty = use ADC / Workload Identity


def _get_client() -> storage.Client:
    if GCS_KEY_PATH:
        credentials = service_account.Credentials.from_service_account_file(GCS_KEY_PATH)
        return storage.Client(credentials=credentials)
    return storage.Client()  # Application Default Credentials


def _get_bucket() -> storage.Bucket:
    return _get_client().bucket(GCS_BUCKET_NAME)


# ── PUBLIC URL ────────────────────────────────────────────────────────────────

def public_url(blob_name: str) -> str:
    return f"https://storage.googleapis.com/{GCS_BUCKET_NAME}/{blob_name}"


# ── UPLOAD SINGLE FILE ────────────────────────────────────────────────────────

async def upload_file(
    file_bytes: bytes,
    destination: str,       # e.g. "articles/my-slug/hero.png"
    content_type: str = "application/octet-stream",
) -> str:
    """Upload bytes to GCS. Returns the public URL."""
    def _upload():
        bucket = _get_bucket()
        blob   = bucket.blob(destination)
        blob.upload_from_string(file_bytes, content_type=content_type)
        blob.make_public()
        return public_url(destination)

    # Run the blocking GCS SDK call in a thread so FastAPI's async loop isn't blocked
    return await asyncio.to_thread(_upload)


# ── BULK UPLOAD ───────────────────────────────────────────────────────────────

async def upload_files(
    files: list[tuple[bytes, str, str]],  # [(bytes, destination, content_type), ...]
) -> list[str]:
    """Upload multiple files in parallel. Returns list of public URLs in order."""
    tasks = [upload_file(b, dest, ct) for b, dest, ct in files]
    return await asyncio.gather(*tasks)


# ── DELETE ────────────────────────────────────────────────────────────────────

async def delete_file(destination: str) -> None:
    """Delete a blob by its path in the bucket."""
    def _delete():
        bucket = _get_bucket()
        blob   = bucket.blob(destination)
        blob.delete()

    await asyncio.to_thread(_delete)


# ── LIST ──────────────────────────────────────────────────────────────────────

async def list_files(prefix: str = "") -> list[dict]:
    """List all blobs under a prefix. Returns [{name, url, size, updated}]."""
    def _list():
        bucket = _get_bucket()
        blobs  = bucket.list_blobs(prefix=prefix)
        return [
            {
                "name":    b.name,
                "url":     public_url(b.name),
                "size":    b.size,
                "updated": b.updated.isoformat() if b.updated else None,
            }
            for b in blobs
        ]

    return await asyncio.to_thread(_list)
