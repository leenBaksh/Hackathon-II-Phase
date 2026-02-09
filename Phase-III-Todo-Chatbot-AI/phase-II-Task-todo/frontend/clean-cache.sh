#!/bin/bash
# Clean Next.js Turbopack cache to fix SST file errors

echo "Cleaning Next.js build cache..."

cd "$(dirname "$0")"

# Remove .next directory
if [ -d ".next" ]; then
    echo "Removing .next directory..."
    rm -rf .next
    echo ".next removed successfully"
else
    echo ".next directory not found"
fi

# Remove node_modules cache
if [ -d "node_modules/.cache" ]; then
    echo "Removing node_modules cache..."
    rm -rf node_modules/.cache
    echo "node_modules cache removed successfully"
else
    echo "node_modules cache not found"
fi

echo ""
echo "Build cache cleaned successfully!"
echo "Run 'npm run dev' to start with fresh cache"