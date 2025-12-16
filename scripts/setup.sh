#!/bin/bash

# TaskFlow AI Setup Script
echo "🚀 Setting up TaskFlow AI..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js 20+ is recommended. Current version: $(node -v)"
    echo "   The application may not work correctly with Node.js < 20"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update it with your configuration"
else
    echo "✅ .env.local already exists"
fi

# Generate JWT secret if not set
if grep -q "change-this-to-a-secure" .env.local 2>/dev/null; then
    echo "🔐 Generating secure JWT secret..."
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.local
    else
        # Linux
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env.local
    fi
    echo "✅ Generated and set JWT_SECRET"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your MongoDB connection string"
echo "2. (Optional) Add your OPENAI_API_KEY for AI features"
echo "3. Start MongoDB: docker run -d -p 27017:27017 --name mongodb mongo:latest"
echo "4. Run: npm run dev"
echo ""

