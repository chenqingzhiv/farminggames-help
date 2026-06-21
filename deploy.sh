#!/bin/bash
# Build and deploy script for farminggames.help
# Uses Cloudflare Pages Direct Upload via wrangler

cd /home/hermes/farminggames-help

# Source the venv
source /home/hermes/.hermes/hermes-agent/venv/bin/activate

# Build the site
echo "=== Building site ==="
mkdocs build 2>&1 | tail -3

# Deploy via Cloudflare Pages
echo "=== Deploying ==="
npx wrangler pages deploy site --project-name=farminggames-help 2>&1 | tail -10
