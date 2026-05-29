# ── Stage 1: builder ──────────────────────────────────────────────────────────
# Install deps in a separate stage so the final image stays small.
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt


# ── Stage 2: runtime ──────────────────────────────────────────────────────────
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application source (venv and __pycache__ excluded via .dockerignore)
COPY . .

# Cloud Run injects PORT env var; default to 8080
ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
