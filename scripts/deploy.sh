#!/bin/bash

# TaskFlow AI Deployment Script
echo "🚀 Preparing TaskFlow AI for deployment..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - TaskFlow AI"
    echo "✅ Git repository initialized"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "   Consider committing them before deployment"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run linting
echo "🔍 Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before deploying."
    exit 1
fi

# Check environment variables
echo "🔐 Checking environment variables..."
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "   Make sure to set environment variables in your deployment platform"
fi

# Build check (if Node 20+)
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
    echo "🏗️  Building application..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix errors before deploying."
        exit 1
    fi
    echo "✅ Build successful"
else
    echo "⚠️  Skipping build (Node.js 20+ required)"
fi

echo ""
echo "✅ Ready for deployment!"
echo ""
echo "Deployment options:"
echo "1. Vercel:"
echo "   - Push to GitHub: git push origin main"
echo "   - Import project at: https://vercel.com/new"
echo "   - Add environment variables in Vercel dashboard"
echo ""
echo "2. Manual deployment:"
echo "   - Ensure Node.js 20+ is available"
echo "   - Set environment variables"
echo "   - Run: npm run build && npm start"
echo ""

