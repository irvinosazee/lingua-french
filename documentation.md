# Lingua French - Language Learning Application

## 🎯 Project Overview

**Lingua French** is a modern, interactive web application designed to help users learn French through structured lessons, vocabulary practice, and interactive exercises. Built with Next.js 14 and featuring a clean, responsive UI powered by React and Tailwind CSS, this application provides a comprehensive language learning experience.

### Key Features

- 🎓 **Structured Learning**: Progressive lesson system with vocabulary and exercises
- 📊 **Progress Tracking**: XP system, completion tracking, and visual progress indicators
- 🎵 **Audio Support**: Text-to-speech functionality for pronunciation practice
- 📱 **Responsive Design**: Mobile-first design that works across all devices
- 🎨 **Modern UI**: Clean interface with shadcn/ui components
- 🔒 **Lesson Progression**: Locked lesson system that unlocks as you progress
- 💾 **Data Persistence**: SQLite database with Prisma ORM for progress tracking

## 🏗️ Technical Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Prisma ORM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Package Manager**: pnpm
- **Icons**: Lucide React
- **Animations**: Tailwind CSS Animate

### Project Structure

```
lingua/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Dashboard/Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── api/                      # API Routes
│   │   ├── lessons/              # Lessons API endpoints
│   │   │   ├── route.ts          # GET /api/lessons
│   │   │   └── [slug]/route.ts   # GET /api/lessons/[slug]
│   │   └── progress/             # Progress tracking API
│   │       └── route.ts          # GET/POST /api/progress
│   └── lessons/                  # Lessons pages
│       ├── page.tsx              # Lessons listing page
│       ├── loading.tsx           # Loading UI
│       └── [id]/                 # Dynamic lesson pages
│           ├── page.tsx          # Lesson detail page
│           └── exercises/        # Exercise pages
│               └── page.tsx      # Interactive exercises
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── navbar.tsx               # Navigation component
│   ├── lesson-card.tsx          # Lesson preview cards
│   ├── progress-tracker.tsx     # Progress dashboard
│   ├── exercise-component.tsx   # Interactive exercises
│   ├── vocabulary-card.tsx      # Vocabulary display
│   └── completion-modal.tsx     # Success modals
├── lib/                         # Utilities and configurations
│   ├── api.ts                   # API client functions
│   ├── prisma.ts                # Prisma client setup
│   └── utils.ts                 # Utility functions
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma            # Database schema
│   ├── dev.db                   # SQLite database
│   ├── seed.ts                  # Database seeding
│   └── migrations/              # Database migrations
├── data/                        # Static data files
│   └── lessons.json             # Lesson content data
├── hooks/                       # Custom React hooks
├── styles/                      # Additional stylesheets
└── public/                      # Static assets
```

## 🗄️ Database Schema

### Models

#### Lesson

```prisma
model Lesson {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  title       String
  description String?
  vocab       Json     // Array of vocabulary items
  exercises   Json     // Array of exercises
  Progress    Progress[]
  createdAt   DateTime @default(now())
}
```

#### Progress

```prisma
model Progress {
  id          Int      @id @default(autoincrement())
  lessonId    Int
  completed   Boolean  @default(false)
  xpEarned    Int      @default(0)
  completedAt DateTime?
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  @@index([lessonId])
}
```

### Data Structure

#### Vocabulary Items

```typescript
interface VocabularyItem {
  id: number;
  french: string; // French word/phrase
  english: string; // English translation
  pronunciation?: string; // Phonetic pronunciation guide
}
```

#### Exercises

```typescript
interface Exercise {
  id: number;
  type: "mcq" | "translate" | "listening";
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  audioUrl?: string; // For listening exercises
  xpReward?: number; // XP points awarded
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lingua-french.git
   cd lingua-french
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize the database**

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Run migrations
   pnpm prisma migrate dev --name init

   # Seed the database with initial data
   pnpm prisma db seed
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Database operations
pnpm prisma studio          # Open database GUI
pnpm prisma migrate dev     # Create new migration
pnpm prisma db push         # Push schema changes
pnpm prisma db seed         # Seed database
```

## 🎮 Application Features

### 1. Dashboard/Home Page (`app/page.tsx`)

- **Progress Overview**: Visual progress tracking with completion percentages
- **Continue Learning**: Quick access to the next available lesson
- **Statistics Cards**: XP earned, streak tracking, and lesson progress
- **Quick Actions**: Browse all lessons and practice modes

### 2. Lessons Listing (`app/lessons/page.tsx`)

- **Lesson Cards**: Preview of all available lessons
- **Filtering**: Filter by completed, available, or locked lessons
- **Search**: Search lessons by title
- **Progress Indicators**: Visual indicators for lesson status
- **Lesson Locking**: Progressive unlocking system

### 3. Lesson Detail (`app/lessons/[id]/page.tsx`)

- **Vocabulary Preview**: All vocabulary items for the lesson
- **Audio Playback**: Text-to-speech for pronunciation
- **Lesson Information**: Title, description, and progress status
- **Exercise Access**: Navigate to interactive exercises

### 4. Interactive Exercises (`app/lessons/[id]/exercises/page.tsx`)

- **Multiple Exercise Types**:
  - **Multiple Choice Questions (MCQ)**: Choose from options
  - **Translation**: Type the correct translation
  - **Listening**: Audio-based comprehension exercises
- **Real-time Feedback**: Immediate feedback on answers
- **XP System**: Points awarded for correct answers
- **Progress Tracking**: Visual progress through exercises
- **Completion Modal**: Celebration and progress summary

### 5. Components

#### Navigation (`components/navbar.tsx`)

- Clean navigation bar with logo and menu items
- Responsive design for mobile and desktop

#### Progress Tracker (`components/progress-tracker.tsx`)

- Four key metrics: Overall Progress, Total XP, Daily Streak, Next Lesson
- Visual progress bars and statistics
- Responsive grid layout

#### Lesson Cards (`components/lesson-card.tsx`)

- Preview cards showing lesson title and description
- Status indicators (completed, available, locked)
- Progress bars for partially completed lessons

#### Exercise Component (`components/exercise-component.tsx`)

- Handles all three exercise types
- Dynamic UI based on exercise type
- Answer validation and feedback
- Audio playback integration

#### Vocabulary Cards (`components/vocabulary-card.tsx`)

- French word/phrase display
- English translation
- Pronunciation guide
- Audio playback capability

## 🔌 API Endpoints

### Lessons API

#### `GET /api/lessons`

Returns all lessons with vocabulary and exercises.

**Response Format:**

```typescript
{
  id: number
  title: string
  description: string
  vocabulary: VocabularyItem[]
  exercises: Exercise[]
}[]
```

#### `GET /api/lessons/[slug]`

Returns a specific lesson by slug.

**Features:**

- Database-first approach with fallback to mock data
- Data transformation for consistent field naming
- Error handling with graceful degradation

### Progress API

#### `GET /api/progress`

Returns user's learning progress.

**Response Format:**

```typescript
{
  completedLessons: number[]  // Array of completed lesson IDs
  totalXP: number            // Total experience points
  streak: number             // Daily streak count
}
```

#### `POST /api/progress`

Records lesson completion and XP earned.

**Request Body:**

```typescript
{
  lessonId: number
  xp?: number     // Optional, defaults to 10
}
```

**Features:**

- Duplicate completion prevention
- Automatic timestamp recording
- Error handling with graceful degradation

## 🎨 Styling & Design System

### Design Philosophy

- **Modern & Clean**: Minimalist design focusing on content
- **Accessibility First**: High contrast, semantic HTML, keyboard navigation
- **Mobile Responsive**: Mobile-first approach with responsive breakpoints
- **Consistent Spacing**: Unified spacing system throughout the app

### Color Scheme

- **Primary**: Blue variants (`blue-600`, `blue-700`)
- **Success**: Green (`green-500`)
- **Warning**: Orange/Yellow (`orange-500`, `yellow-500`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)

### Component Library (shadcn/ui)

The application uses shadcn/ui components built on Radix UI primitives:

- **Layout**: Card, Separator, Tabs
- **Forms**: Button, Input, Select, Checkbox
- **Feedback**: Alert, Toast, Badge, Progress
- **Navigation**: Dialog, Dropdown Menu, Tooltip
- **Data Display**: Table, Accordion, Carousel

### Animations

- Subtle transitions using `tailwindcss-animate`
- Loading states with spin animations
- Hover effects and micro-interactions

## 🧠 Learning System

### Lesson Structure

1. **Vocabulary Introduction**: Learn new words with pronunciations
2. **Interactive Exercises**: Practice through different exercise types
3. **Progress Tracking**: XP points and completion status
4. **Unlocking System**: Sequential lesson access

### Exercise Types

#### 1. Multiple Choice Questions (MCQ)

- Question with 3-4 answer options
- Immediate feedback on selection
- XP reward for correct answers

#### 2. Translation Exercises

- English prompt → French answer required
- Text input with answer validation
- Case-insensitive matching

#### 3. Listening Exercises

- Audio playback of French words/phrases
- Type what you hear
- Text-to-speech integration

### Progression System

- **Linear Progression**: Lessons unlock sequentially
- **XP Rewards**: Points for correct answers (10-15 XP typically)
- **Completion Tracking**: Persistent progress storage
- **Visual Feedback**: Progress bars and achievement indicators

## 🔧 Configuration Files

### Next.js Configuration (`next.config.mjs`)

```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip linting during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TS errors during builds
  },
  images: {
    unoptimized: true, // Disable image optimization
  },
};
```

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES6
- **Module**: ESNext with bundler resolution
- **Strict Mode**: Enabled
- **Path Mapping**: `@/*` → `./*`

### Tailwind Configuration

- **Version**: v4 (latest)
- **Plugins**:
  - `@tailwindcss/postcss`
  - `tailwindcss-animate`
  - `tw-animate-css`

### Prisma Configuration

- **Provider**: SQLite
- **Client**: Generated Prisma Client
- **Seed**: TypeScript seed script

## 📱 Responsive Design

### Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px)
- **Large**: `lg:` (≥ 1024px)
- **Extra Large**: `xl:` (≥ 1280px)

### Mobile Optimizations

- Touch-friendly button sizes (minimum 44px)
- Readable typography (16px base font size)
- Optimized grid layouts
- Hamburger navigation (when implemented)
- Swipe gestures support

### Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader compatibility
- Focus indicators

## 🚦 Error Handling & Fallbacks

### Database Connection Issues

- **API Fallbacks**: Mock data when database is unavailable
- **Graceful Degradation**: App continues to function with limited features
- **User Feedback**: Clear error messages and loading states

### Network Issues

- **Client-side Caching**: Reduces API calls
- **Retry Logic**: Automatic retry for failed requests
- **Offline Indicators**: User awareness of connection status

### Data Validation

- **TypeScript**: Compile-time type checking
- **Runtime Validation**: Input validation and sanitization
- **Error Boundaries**: Graceful handling of React errors

## 🧪 Testing Strategy

### Recommended Testing Approach

#### Unit Tests

- **Components**: Test individual component rendering and behavior
- **API Functions**: Test API client functions and data transformations
- **Utilities**: Test helper functions and data processing

#### Integration Tests

- **API Routes**: Test endpoint functionality and data flow
- **Database Operations**: Test Prisma queries and migrations
- **Component Interactions**: Test user workflows and state management

#### E2E Tests

- **User Journeys**: Complete lesson completion flow
- **Navigation**: Test routing and page transitions
- **Exercise Interactions**: Test all exercise types and feedback

### Testing Tools (Recommended)

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking for tests

## 🔒 Security Considerations

### Data Protection

- **Input Sanitization**: Prevent XSS and injection attacks
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Variables**: Secure configuration management

### Database Security

- **Parameterized Queries**: Prisma ORM prevents SQL injection
- **Connection Security**: Secure database connection strings
- **Data Backup**: Regular database backups recommended

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link GitHub repository to Vercel
2. **Environment Variables**: Set `DATABASE_URL` in Vercel dashboard
3. **Build Settings**:
   - Build Command: `pnpm build`
   - Output Directory: `.next`
4. **Database Setup**: Consider upgrading to PostgreSQL for production

### Self-Hosting Options

1. **Docker**: Containerize the application
2. **PM2**: Process management for Node.js
3. **Nginx**: Reverse proxy and static file serving
4. **Database**: PostgreSQL or MySQL for production

### Environment Setup

```env
# Production Environment Variables
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="your-production-url"
NEXTAUTH_SECRET="your-secret-key"
```

## 🎯 Future Enhancements

### Planned Features

1. **User Authentication**: User accounts and personalized progress
2. **Social Features**: Leaderboards and friend challenges
3. **Advanced Exercises**: Speaking recognition, grammar exercises
4. **Offline Mode**: Progressive Web App capabilities
5. **Multi-language**: Support for learning other languages
6. **Spaced Repetition**: Intelligent review system
7. **Achievements**: Badges and milestone rewards

### Technical Improvements

1. **Performance**: Code splitting and optimization
2. **Testing**: Comprehensive test suite
3. **Analytics**: User behavior tracking and insights
4. **Monitoring**: Error tracking and performance monitoring
5. **Caching**: Advanced caching strategies
6. **SEO**: Search engine optimization

### Content Expansion

1. **More Lessons**: Expanded curriculum
2. **Audio Content**: Professional voice recordings
3. **Video Lessons**: Visual learning components
4. **Cultural Content**: French culture and context
5. **Advanced Topics**: Grammar explanations and rules

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Code Standards

- **ESLint**: Follow established linting rules
- **Prettier**: Code formatting consistency
- **TypeScript**: Strict type checking
- **Commit Messages**: Conventional commit format

### Before Contributing

- Test your changes locally
- Ensure database migrations work
- Update documentation if needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

### Getting Help

- **Documentation**: Check this comprehensive guide first
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

### Common Issues

#### Database Connection

```bash
# Reset database
pnpm prisma migrate reset --force
pnpm prisma db seed
```

#### Missing Dependencies

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Build Issues

```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

---

**Lingua French** - Making French learning accessible, interactive, and enjoyable! 🇫🇷✨
