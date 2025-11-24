#!/bin/sh
set -e

# Créer le fichier credentials à partir de base64 ou JSON direct
if [ -n "$GOOGLE_APPLICATION_CREDENTIALS_BASE64" ]; then
  echo "📊 Creating Google Analytics credentials file from base64..."
  echo "$GOOGLE_APPLICATION_CREDENTIALS_BASE64" | base64 -d > /app/google-analytics-credentials.json
  echo "✅ Credentials file created from base64"
elif [ -n "$GOOGLE_APPLICATION_CREDENTIALS_JSON" ]; then
  echo "📊 Creating Google Analytics credentials file from JSON..."
  echo "$GOOGLE_APPLICATION_CREDENTIALS_JSON" > /app/google-analytics-credentials.json
  echo "✅ Credentials file created from JSON"
fi

echo "🔄 Running Prisma migrations..."
npx prisma db push --skip-generate --accept-data-loss

echo "🚀 Starting Next.js server..."
node server.js
