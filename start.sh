#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma db push --skip-generate --accept-data-loss

echo "🚀 Starting Next.js server..."
node server.js
