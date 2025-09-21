# Lingua - French Learning App

A modern, interactive French language learning application built with Next.js 14, featuring comprehensive lessons, progress tracking, and an engaging XP-based learning system.

## 🚀 Features

- **Interactive Lessons**: Structured vocabulary and exercise content with multiple lesson categories
- **Multiple Exercise Types**: 
  - Multiple choice questions (MCQ)
  - Translation exercises  
  - Listening comprehension with text-to-speech
- **Progress Tracking**: XP system, lesson completion tracking, and learning streaks
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Accessibility**: Built with Radix UI primitives for screen reader support
- **Offline Development**: Graceful fallbacks to mock data when database is unavailable

## 🛠 Tech Stack

### Frontend
- **Next.js 14.2.25** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Full type safety
- **Tailwind CSS 4.1.9** - Utility-first styling
- **shadcn/ui** - High-quality component library

### Backend & Database
- **Prisma 6.16.2** - Type-safe database ORM
- **SQLite** - Lightweight database for development
- **Next.js API Routes** - Serverless API endpoints

### Key Dependencies
- **react-hook-form** - Form management and validation
- **zod** - Schema validation
- **lucide-react** - Beautiful icons
- **next-themes** - Dark/light mode support
- **sonner** - Toast notifications

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── lessons/       # Lesson data endpoints
│   │   └── progress/      # Progress tracking endpoints
│   ├── lessons/           # Lesson pages and exercises
│   │   └── [slug]/        # Dynamic lesson routes
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage with lesson grid
│   └── globals.css        # Global styles and design tokens
├── components/            # React components
│   ├── ui/               # shadcn/ui components (40+ components)
│   ├── exercise-component.tsx    # Interactive exercise interface
│   ├── navbar.tsx               # Navigation header
│   ├── progress-tracker.tsx     # XP and progress display
│   └── lesson-card.tsx          # Lesson preview cards
├── data/                 # Static lesson content
│   └── lessons.json      # Structured lesson data
├── lib/                  # Utilities and API client
│   ├── api.ts           # API client functions
│   └── utils.ts         # Utility functions
├── prisma/               # Database configuration
│   └── schema.prisma    # Database schema
├── scripts/              # Database setup scripts
│   ├── setup-database.ts    # Prisma setup and migration
│   └── init-database.ts     # Sample data seeding
└── public/               # Static assets
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** 
- **pnpm** package manager (recommended - project uses pnpm-lock.yaml)

### Installation

1. **Clone and install dependencies**
   \`\`\`bash
   git clone <repository-url>
   cd lingua
   pnpm install
   \`\`\`

2. **Environment setup**
   
   The `.env` file is already configured with:
   \`\`\`env
   DATABASE_URL="file:./dev.db"
   \`\`\`

3. **Database setup and migration**
   \`\`\`bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Apply database migrations (creates SQLite database)
   pnpm prisma migrate dev
   
   # Seed database with French lesson data
   pnpm prisma db seed
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄 Database Setup

### Schema Overview
The app uses two main models:

**Lesson Model**
- `id` - Auto-incrementing unique identifier
- `slug` - URL-friendly lesson identifier (unique)
- `title` - Lesson display name
- `description` - Lesson overview (optional)
- `vocab` - JSON array of French vocabulary with translations and pronunciation
- `exercises` - JSON array of interactive exercises
- `createdAt` - Timestamp when lesson was created

**Progress Model**  
- `id` - Auto-incrementing unique identifier
- `lessonId` - Foreign key reference to lesson
- `completed` - Boolean completion status (default: false)
- `xpEarned` - Experience points awarded (default: 0)
- `completedAt` - Timestamp when lesson was completed (optional)

### Database Commands
\`\`\`bash
# Generate Prisma client
pnpm prisma generate

# Apply migrations to database
pnpm prisma migrate dev

# Reset database and reapply migrations
pnpm prisma migrate reset

# Seed database with lesson data
pnpm prisma db seed

# View database in Prisma Studio
pnpm prisma studio
\`\`\`

### Database Location
The SQLite database file is located at `prisma/dev.db` and is created automatically when you run migrations.

## 🎯 API Endpoints

### Lessons API
- `GET /api/lessons` - Fetch all available lessons
- `GET /api/lessons/[slug]` - Fetch specific lesson by slug

### Progress API  
- `GET /api/progress` - Get user progress summary
- `POST /api/progress` - Update lesson completion status

### Response Format
\`\`\`typescript
// Lesson Response (from your data/lessons.json structure)
{
  slug: string
  title: string
  description: string
  vocab: Array<{
    fr: string
    en: string
    pronunciation: string
  }>
  exercises: Array<{
    type: 'mcq' | 'translation' | 'listening'
    question: string
    options?: string[]
    correctAnswer: string
    xp: number
  }>
}

// Progress Response
{
  completedLessons: number
  totalXP: number
  currentStreak: number
  lessonsProgress: Array<{
    lessonId: number
    completed: boolean
    xpEarned: number
  }>
}
\`\`\`

## 🎯 Complete Setup Commands (Copy & Paste)

For your `csh` shell, run these commands in order:

\`\`\`csh
# Navigate to project directory
cd "/Users/mac/Documents/Web Dev/mini projects/lingua"

# Install all dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Apply database migrations (creates SQLite DB)
pnpm prisma migrate dev

# Seed database with French lesson data
pnpm prisma db seed

# Start development server
pnpm dev
\`\`\`

## 🧪 Testing Your Setup

After running the setup commands:

1. **Visit** `http://localhost:3000` - should show the main app
2. **Check lessons** at `http://localhost:3000/lessons` - should display French lessons  
3. **Individual lesson** at `http://localhost:3000/lessons/[id]` - should show lesson content
4. **Exercises** at `http://localhost:3000/lessons/[id]/exercises` - should show interactive exercises
5. **Database verification**: 
   \`\`\`csh
   pnpm prisma studio
   \`\`\`
   Opens database browser at `http://localhost:5555`

## 🎨 Design System

### Color Palette
The app uses a carefully crafted design token system defined in `globals.css`:
- **Primary**: Blue-based brand colors
- **Neutrals**: Sophisticated grays for text and backgrounds  
- **Accents**: Success greens and warning colors
- **Dark Mode**: Full dark theme support

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: System font stack
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
All UI components follow shadcn/ui patterns with:
- Consistent spacing using Tailwind's scale
- Accessible color contrast ratios
- Responsive breakpoints
- Focus states and keyboard navigation

## 🧪 Development Features

### Mock Data Fallback
The app gracefully handles database connection issues by falling back to static JSON data, ensuring development can continue without database setup.

### Error Handling
- API routes return appropriate HTTP status codes
- Frontend components handle loading and error states
- Toast notifications for user feedback

### Type Safety
- Full TypeScript implementation
- Zod schemas for runtime validation
- Prisma-generated types for database operations

## 📱 Lesson Content

### Current Lessons
1. **Basics 1** - Essential greetings and common phrases
2. **Basics 2** - Numbers, colors, and basic vocabulary  
3. **Family Members** - Family relationships and descriptions

### Exercise Types
- **Multiple Choice**: Select correct translation or answer
- **Translation**: Type French or English translations
- **Listening**: Audio pronunciation with text matching

### XP System
- Vocabulary exercises: 5 XP each
- Translation exercises: 10 XP each  
- Listening exercises: 15 XP each
- Lesson completion bonus: 50 XP

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Environment Variables for Production
\`\`\`env
DATABASE_URL="file:./dev.db"
NODE_ENV=production
\`\`\`

### Build Commands
\`\`\`bash
# Build for production
pnpm build

# Start production server  
pnpm start

# Run production with specific port
pnpm start -- -p 3000
\`\`\`

## 🔧 Troubleshooting

### Common Issues

**pnpm not installed**
\`\`\`csh
# Install pnpm globally
npm install -g pnpm
\`\`\`

**Dependency conflicts**
\`\`\`csh
# Delete node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
\`\`\`

**Database issues**
\`\`\`csh
# Reset and recreate database
rm prisma/dev.db
pnpm prisma migrate dev
pnpm prisma db seed
\`\`\`

**Port conflicts**
\`\`\`csh
# Use different port  
pnpm dev -- -p 3001
\`\`\`

**Prisma Client not generated**
\`\`\`csh
# Regenerate Prisma client
pnpm prisma generate
\`\`\`

**Migration errors**
\`\`\`csh
# Reset migrations and start fresh
pnpm prisma migrate reset
pnpm prisma migrate dev
\`\`\`

### Verification Commands
\`\`\`csh
# Check if database exists and has data
pnpm prisma studio

# View current migrations status
pnpm prisma migrate status

# Check lesson data was seeded
ls -la prisma/dev.db
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test with both database and mock data modes
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Learning! 🇫🇷**

For support or questions, please open an issue in the repository.
