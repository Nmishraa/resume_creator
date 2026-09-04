#!/usr/bin/env bash
# Automated Production Deployment Script for Resume Craft on VPS
# Target URL: https://resume.gnanamai.com

set -euo pipefail

APP_DIR="/home/neha_developer/resume_creator"
echo "🚀 Starting automated production deployment for Resume Craft..."

cd "$APP_DIR"

# 1. Backup current dist build
if [ -d "$APP_DIR/dist" ]; then
    echo "📦 Backing up existing dist release..."
    cp -r "$APP_DIR/dist" "$APP_DIR/dist.bak_$(date +%Y%m%d_%H%M%S)" || true
fi

# 2. Install dependencies safely
echo "📥 Installing locked dependencies..."
npm ci --prefer-offline --no-audit || npm install

# 3. Generate Prisma client for neha_data database
echo "🗄️ Generating Prisma Client for neha_data PostgreSQL database..."
npx --yes prisma@5.22.0 generate

# 4. Build production frontend (34 static SSG routes)
echo "⚡ Building frontend static production bundle..."
if [ -d "$APP_DIR/dist/assets" ]; then
    echo "📦 Preserving active assets for active browser sessions..."
    mkdir -p "$APP_DIR/dist_old_assets"
    cp -r "$APP_DIR/dist/assets"/* "$APP_DIR/dist_old_assets/" 2>/dev/null || true
fi

VITE_API_URL=/api npm run build

if [ -d "$APP_DIR/dist_old_assets" ]; then
    echo "🔗 Merging legacy session assets to prevent chunk load 404s..."
    cp -n "$APP_DIR/dist_old_assets"/* "$APP_DIR/dist/assets/" 2>/dev/null || true
    rm -rf "$APP_DIR/dist_old_assets"
fi

# 5. Verify Nginx syntax before reload
echo "🛡️ Verifying Nginx configuration syntax..."
nginx -t

# 6. Restart backend process in PM2
echo "🔄 Restarting resume-backend in PM2..."
pm2 restart resume-backend

# 7. Reload Nginx web server
echo "🌐 Reloading Nginx..."
systemctl reload nginx

echo "✅ Production deployment completed successfully for https://resume.gnanamai.com!"
