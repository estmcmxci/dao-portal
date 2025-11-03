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

# Generate secure-deploy.config.json with values from environment
CONFIG_JSON="$SCRIPT_DIR/secure-deploy.config.json"
echo "📝 Generating deployment configuration..."
cat > "$CONFIG_JSON" << EOF
{
  "network": "${NETWORK:-mainnet}",
  "rpcUrl": "${RPC_URL}",
  "ensDomain": "${ENS_DOMAIN}",
  "safeAddress": "${SAFE_ADDRESS}",
  "safeApiKey": "${SAFE_API_KEY}",
  "ownerPrivateKey": "${OWNER_PRIVATE_KEY}",
  "quiet": false,
  "debug": false
}
EOF

echo "✅ Configuration generated"
echo ""
echo "🚀 Deploying to ${ENS_DOMAIN}..."
echo ""

# Run Autark CLI deployment
cd "$SCRIPT_DIR"
autark deploy --config secure-deploy.config.json

echo ""
echo "✅ Deployment complete!"

