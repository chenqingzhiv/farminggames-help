#!/bin/bash
# git-push-api.sh - Push files to GitHub repo using API (bypasses git HTTPS auth)
# Reads token from .env at runtime
set -e

ENV_FILE="$HOME/.hermes/.env"
TOKEN=*** -oP '^GITHUB_TOKEN=*** "$ENV_FILE" | head -1 | tr -d '"')

if [ -z "$TOKEN" ]; then
    echo "ERROR: Token not found"
    exit 1
fi

REPO="chenqingzhiv/game-guide"
BRANCH="main"
WORKDIR="$HOME/game-guide/site"

# Check if site directory exists
if [ ! -d "$WORKDIR" ]; then
    echo "ERROR: $WORKDIR not found"
    exit 1
fi

# Step 1: Get the latest commit SHA of the branch
echo "Getting current commit..."
REF_URL="https://api.github.com/repos/${REPO}/git/refs/heads/${BRANCH}"
REF=$(curl -sf -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" "${REF_URL}")
CURRENT_SHA=$(echo "$REF" | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")
echo "Current commit: ${CURRENT_SHA}"

# Step 2: Get the current tree SHA
COMMIT_URL="https://api.github.com/repos/${REPO}/git/commits/${CURRENT_SHA}"
COMMIT=$(curl -sf -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" "${COMMIT_URL}")
BASE_TREE=$(echo "$COMMIT" | python3 -c "import sys,json; print(json.load(sys.stdin)['tree']['sha'])")
echo "Base tree: ${BASE_TREE}"

# Step 3: Create blobs for all files in site/ directory
echo "Creating blobs..."
BLOBS="[]"
cd "$WORKDIR"

# Function to create blob and return JSON for tree entry
create_blob() {
    local file="$1"
    local filename="${file#./}"
    local content
    content=$(base64 -w0 "$file")
    
    BLOB_RESULT=$(curl -sf -X POST \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Accept: application/vnd.github+json" \
        https://api.github.com/repos/${REPO}/git/blobs \
        -d "{\"content\":\"${content}\",\"encoding\":\"base64\"}")
    
    BLOB_SHA=$(echo "$BLOB_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
    
    # Determine mode: 100644 for files, 040000 for dirs (dirs handled by tree)
    MODE="100644"
    
    echo "{\"path\":\"${filename}\",\"mode\":\"${MODE}\",\"type\":\"blob\",\"sha\":\"${BLOB_SHA}\"}"
}

# Find all files recursively
FILES=$(find . -type f | sort)
FILE_COUNT=$(echo "$FILES" | wc -l)
echo "Found ${FILE_COUNT} files to upload"

# Build tree entries JSON array
ENTRIES="["
FIRST=true
while IFS= read -r file; do
    file="${file#./}"
    if [ -z "$file" ]; then continue; fi
    
    echo "  Blobbing: $file"
    content=$(base64 -w0 "$file")
    
    BLOB_RESULT=$(curl -sf -X POST \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Accept: application/vnd.github+json" \
        https://api.github.com/repos/${REPO}/git/blobs \
        -d "{\"content\":\"${content}\",\"encoding\":\"base64\"}")
    
    BLOB_SHA=$(echo "$BLOB_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
    
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        ENTRIES="${ENTRIES},"
    fi
    ENTRIES="${ENTRIES}{\"path\":\"${file}\",\"mode\":\"100644\",\"type\":\"blob\",\"sha\":\"${BLOB_SHA}\"}"
done <<< "$FILES"
ENTRIES="${ENTRIES}]"

echo "Creating tree..."
TREE_RESULT=$(curl -sf -X POST \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/repos/${REPO}/git/trees \
    -d "{\"base_tree\":\"${BASE_TREE}\",\"tree\":${ENTRIES}}")

NEW_TREE=$(echo "$TREE_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
echo "New tree: ${NEW_TREE}"

# Step 5: Create a commit
echo "Creating commit..."
COMMIT_RESULT=$(curl -sf -X POST \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/repos/${REPO}/git/commits \
    -d "{\"message\":\"Deploy: update static site via API\",\"tree\":\"${NEW_TREE}\",\"parents\":[\"${CURRENT_SHA}\"]}")

NEW_COMMIT=$(echo "$COMMIT_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sha'])")
echo "New commit: ${NEW_COMMIT}"

# Step 6: Update the branch ref
echo "Updating branch..."
UPDATE_RESULT=$(curl -sf -X PATCH \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/repos/${REPO}/git/refs/heads/${BRANCH} \
    -d "{\"sha\":\"${NEW_COMMIT}\",\"force\":true}")

echo "Done! Branch updated. Commit: ${NEW_COMMIT}"
