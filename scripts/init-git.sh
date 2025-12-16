#!/bin/bash

# Initialize Git repository and prepare for deployment

echo "🔧 Initializing Git repository..."

# Check if git is already initialized
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "📦 Initializing new Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Committing changes..."
    git commit -m "Initial commit - TaskFlow AI Application

- Full-stack Next.js 16 application
- MongoDB database integration
- JWT authentication
- CRUD operations for tasks
- AI-powered features
- Responsive UI with Tailwind CSS
- Production-ready deployment configuration"
    echo "✅ Changes committed"
else
    echo "ℹ️  No changes to commit"
fi

# Check for remote
if git remote | grep -q origin; then
    echo "✅ Remote 'origin' already configured"
    echo "   Current remote: $(git remote get-url origin)"
else
    echo "⚠️  No remote repository configured"
    echo ""
    echo "To add a remote repository:"
    echo "  git remote add origin <your-repo-url>"
    echo "  git push -u origin main"
fi

echo ""
echo "✅ Git setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository"
echo "2. Add remote: git remote add origin <your-repo-url>"
echo "3. Push code: git push -u origin main"
echo "4. Deploy to Vercel: https://vercel.com/new"
echo ""

