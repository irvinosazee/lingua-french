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
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and install dependencies**
   \`\`\`bash
   git clone <repository-url>
   cd lingua-french-app
   npm install
   \`\`\`

2. **Set up environment variables**
   
   Create a `.env.local` file or set in your deployment platform:
   \`\`\`env
   DATABASE_URL=file:./prisma/dev.db
   NODE_ENV=development
   \`\`\`

3. **Initialize the database**
   
   The app includes setup scripts that can be run to configure the database:
   - `scripts/setup-database.ts` - Sets up Prisma and creates tables
   - `scripts/init-database.ts` - Seeds sample lesson data

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄 Database Setup

### Schema Overview
The app uses two main models:

**Lesson Model**
- `id` - Unique identifier
- `slug` - URL-friendly lesson identifier  
- `title` - Lesson display name
- `description` - Lesson overview
- `vocabulary` - JSON array of French words with translations
- `exercises` - JSON array of interactive exercises

**Progress Model**  
- `id` - Unique identifier
- `lessonId` - Foreign key to lesson
- `completed` - Completion status
- `xpEarned` - Experience points awarded
- `completedAt` - Completion timestamp

### Database Commands
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio
\`\`\`

## 🎯 API Endpoints

### Lessons API
- `GET /api/lessons` - Fetch all available lessons
- `GET /api/lessons/[slug]` - Fetch specific lesson by slug

### Progress API  
- `GET /api/progress` - Get user progress summary
- `POST /api/progress` - Update lesson completion status

### Response Format
\`\`\`typescript
// Lesson Response
{
  id: string
  slug: string
  title: string
  description: string
  vocabulary: Array<{
    french: string
    english: string
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
    lessonId: string
    completed: boolean
    xpEarned: number
  }>
}
\`\`\`

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
DATABASE_URL=file:./prisma/prod.db
NODE_ENV=production
\`\`\`

### Build Commands
\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify `DATABASE_URL` environment variable is set
- Run database setup scripts
- Check file permissions for SQLite database

**API 500 Errors**  
- The app will fallback to mock data automatically
- Check browser console for detailed error messages
- Verify Prisma client is generated

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Verify design tokens in `globals.css`

### Debug Mode
Add console.log statements with `[v0]` prefix for debugging:
\`\`\`typescript
console.log("[v0] User progress:", progressData)
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
