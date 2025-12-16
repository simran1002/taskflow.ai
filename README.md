# TaskFlow AI - Intelligent Task Management Application

A full-stack task management application built with Next.js 16, TypeScript, MongoDB, and AI-powered features. This application demonstrates modern web development practices including secure authentication, CRUD operations, and intelligent task prioritization.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks with validation
- **Task Management**: 
  - Priority levels (Low, Medium, High)
  - Status tracking (To Do, In Progress, Completed)
  - Due date management
  - Task descriptions
- **Filtering & Search**: Filter tasks by status and priority
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS

### AI-Powered Features
- **Intelligent Priority Prediction**: AI suggests task priority based on title, description, and due date
- **Task Management Suggestions**: Get AI-powered advice for better task organization
- **Context-Aware Recommendations**: AI considers your task history for personalized suggestions

### Technical Highlights
- **Next.js 16**: Latest features including App Router, Server Components, and API Routes
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Scalable NoSQL database with Mongoose ODM
- **Security**: 
  - Password hashing with bcrypt
  - JWT token-based authentication
  - Input validation and sanitization
  - Protected API routes
- **Performance**: 
  - Server-side rendering (SSR)
  - Code splitting
  - Optimized database queries with indexes
- **State Management**: Zustand for client-side state
- **UI Components**: Custom components built with Radix UI primitives

## 📋 Prerequisites

- Node.js 20.x or higher
- MongoDB database (local or MongoDB Atlas)
- OpenAI API key (optional, for AI features)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskflow-ai
   JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
   JWT_EXPIRE=7d
   OPENAI_API_KEY=sk-your-openai-api-key-here
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. Update `MONGODB_URI` in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskflow-ai
   ```

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow-ai
   ```

## 🚢 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   Add the following in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `NODE_ENV=production`

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Other Platforms

The application can also be deployed to:
- **Netlify**: Configure build command and environment variables
- **Railway**: Connect GitHub repo and add environment variables
- **Render**: Similar setup to Vercel

## 🧪 Testing

Run the linter:
```bash
npm run lint
```

Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
taskflow-ai/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── tasks/        # Task CRUD endpoints
│   │   └── ai/           # AI-powered endpoints
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── layout.tsx        # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   ├── TaskCard.tsx      # Task display component
│   ├── TaskDialog.tsx    # Task create/edit dialog
│   └── AISuggestions.tsx # AI suggestions component
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
├── models/
│   ├── User.ts           # User model
│   └── Task.ts           # Task model
├── store/
│   ├── useAuthStore.ts   # Auth state management
│   └── useTaskStore.ts   # Task state management
└── middleware.ts         # Route protection middleware
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Mongoose ODM protection
- **XSS Protection**: React's built-in escaping
- **CSRF Protection**: SameSite cookie attributes
- **Rate Limiting**: Can be added via middleware
- **Environment Variables**: Sensitive data in env files

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: User feedback during async operations
- **Error Handling**: Clear error messages
- **Modern Design**: Clean, intuitive interface
- **Dark Mode Ready**: Can be extended with theme toggle

## 🤖 AI Integration

The application uses OpenAI's GPT-4o-mini model for:
1. **Priority Prediction**: Analyzes task details to suggest priority
2. **Task Suggestions**: Provides intelligent task management advice

To enable AI features:
1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com)
2. Add it to your `.env.local` file
3. AI features will automatically work

Note: AI features gracefully degrade if API key is not configured.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get single task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### AI
- `POST /api/ai/suggestions` - Get AI task suggestions
- `POST /api/ai/priority` - Predict task priority

## 🛣️ Routes

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard (protected)

## 🚀 Performance Optimizations

- **Server-Side Rendering**: Faster initial page loads
- **Code Splitting**: Automatic route-based splitting
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections
- **Caching**: HTTP caching headers (can be extended)
- **Image Optimization**: Next.js Image component ready

## 📄 License

This project is created as part of a full-stack developer assignment for House of Edtech.

## 👤 Developer

**Name**: [Your Name]  
**GitHub**: [Your GitHub Profile]  
**LinkedIn**: [Your LinkedIn Profile]

---

Built with ❤️ using Next.js 16, TypeScript, MongoDB, and AI
