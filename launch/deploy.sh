#!/bin/bash

# Deployment script for ENS DAO Governance Portal
# This script loads environment variables from .env and runs Autark CLI
# 
# Usage:
#   ./deploy.sh                    # Deploy from launch/ directory
#   cd launch && ./deploy.sh       # Or run from project root

set -e  # Exit on error

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Check if .env file exists
ENV_FILE="$PROJECT_ROOT/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: .env file not found at $ENV_FILE"
    echo "   Please create it from .env.example and fill in your values"
    exit 1
fi

# Load environment variables from .env
echo "📋 Loading environment variables from .env..."
export $(grep -v '^#' "$ENV_FILE" | xargs)

# Check required environment variables
REQUIRED_VARS=("OWNER_PRIVATE_KEY" "SAFE_API_KEY" "SAFE_ADDRESS" "RPC_URL" "ENS_DOMAIN")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "❌ Error: Missing required environment variables:"
    printf '   - %s\n' "${MISSING_VARS[@]}"
    echo ""
    echo "   Please ensure your .env file contains all required values"
    exit 1
fi

# Source directory for Next.js app
SOURCE_DIR="$PROJECT_ROOT/dao portal/my-app"
SOURCE_OUT_DIR="$SOURCE_DIR/out"
OUT_DIR="$SCRIPT_DIR/out"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source code directory not found at $SOURCE_DIR"
    echo "   Expected Next.js app at: dao portal/my-app/"
    exit 1
fi

# Check if source has been built
if [ ! -d "$SOURCE_OUT_DIR" ]; then
    echo "📦 Building Next.js static site..."
    echo ""
    cd "$SOURCE_DIR"
    npm run build
    
    if [ ! -d "$SOURCE_OUT_DIR" ]; then
        echo "❌ Error: Build failed - output directory not found at $SOURCE_OUT_DIR"
        exit 1
    fi
    echo "✅ Build complete"
    echo ""
fi

# Copy build output to launch/out/ (cleaning first to avoid stale files)
echo "📋 Copying build output to deployment directory..."
rm -rf "$OUT_DIR"
cp -r "$SOURCE_OUT_DIR" "$OUT_DIR"

# Remove any secure-deploy.config.json that might have been copied (shouldn't be in build)
if [ -f "$OUT_DIR/secure-deploy.config.json" ]; then
    echo "⚠️  Warning: Found secure-deploy.config.json in build output (removing it)"
    rm "$OUT_DIR/secure-deploy.config.json"
fi

echo "✅ Build output ready in $OUT_DIR"
echo ""
echo "🚀 Deploying to ${ENS_DOMAIN}..."
echo ""

# Run Autark CLI deployment with command-line flags
cd "$SCRIPT_DIR"
autark deploy "$OUT_DIR" \
  --ens-domain "${ENS_DOMAIN}" \
  --safe-address "${SAFE_ADDRESS}" \
  --owner-private-key "${OWNER_PRIVATE_KEY}" \
  --rpc-url "${RPC_URL}" \
  --safe-api-key "${SAFE_API_KEY}" \
  --network "${NETWORK:-mainnet}"

echo ""
echo "✅ Deployment complete!"

