# Lingua Project Understanding Guide

## 📖 Project Overview

**Lingua** is a modern, interactive French language learning application built with Next.js 14. It provides a gamified learning experience with structured lessons, progress tracking, and various exercise types to help users learn French effectively.

### Key Features

- Interactive French lessons with vocabulary and exercises
- Multiple exercise types (MCQ, Translation, Listening comprehension)
- XP-based progress tracking system
- Responsive design for all devices
- Offline development support with mock data fallbacks
- Accessibility-focused using Radix UI components

---

## 🏗️ Technical Architecture

### Tech Stack

#### Frontend

- **Next.js 14.2.25** with App Router (React 19)
- **TypeScript 5** for type safety
- **Tailwind CSS 4.1.9** for styling
- **shadcn/ui** component library built on Radix UI

#### Backend & Data

- **Prisma 6.16.2** ORM with SQLite database
- **Next.js API Routes** for serverless endpoints
- **JSON-based lesson content** stored in `/data/lessons.json`

#### Key Dependencies

- `react-hook-form` + `zod` for form validation
- `lucide-react` for icons
- `next-themes` for dark/light mode
- `sonner` for toast notifications
- `@vercel/analytics` for usage tracking

---

## 📁 Project Structure Deep Dive

```
lingua/
├── app/                          # Next.js App Router
│   ├── api/                      # Server-side API endpoints
│   │   ├── lessons/              # Lesson data management
│   │   │   ├── route.ts          # GET all lessons, POST new lessons
│   │   │   └── [slug]/route.ts   # GET specific lesson by slug
│   │   └── progress/             # User progress tracking
│   │       └── route.ts          # GET/POST progress data
│   ├── lessons/                  # Lesson-related pages
│   │   ├── page.tsx              # Lessons overview page
│   │   ├── loading.tsx           # Loading state component
│   │   └── [id]/                 # Dynamic lesson routes
│   │       ├── page.tsx          # Individual lesson page
│   │       └── exercises/        # Exercise-specific pages
│   │           └── page.tsx      # Exercise interface
│   ├── layout.tsx                # Root layout with fonts & meta
│   ├── page.tsx                  # Homepage/dashboard
│   └── globals.css               # Global styles & CSS variables
├── components/                   # Reusable React components
│   ├── audio-test.tsx           # Text-to-speech testing component
│   ├── completion-modal.tsx     # Lesson completion celebration
│   ├── exercise-component.tsx   # Main exercise interface
│   ├── lesson-card.tsx          # Lesson display cards
│   ├── navbar.tsx               # Navigation component
│   ├── progress-tracker.tsx     # XP and progress visualization
│   ├── vocabulary-card.tsx      # Vocabulary item display
│   └── ui/                      # shadcn/ui component library
├── data/
│   └── lessons.json             # Static lesson content
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── api.ts                   # API client functions
│   ├── prisma.ts               # Prisma client setup
│   └── utils.ts                # General utilities
├── prisma/                      # Database setup
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Database seeding
│   └── dev.db                  # SQLite database file
└── scripts/                     # Setup and maintenance scripts
```

---

## 🗄️ Database Schema

The application uses a simple but effective database structure:

### Models

#### `Lesson`

- `id`: Primary key (auto-increment)
- `slug`: Unique identifier for URL routing
- `title`: Lesson display name
- `description`: Optional lesson description
- `vocab`: JSON field containing vocabulary items
- `exercises`: JSON field containing exercise data
- `createdAt`: Timestamp

#### `Progress`

- `id`: Primary key
- `lessonId`: Foreign key to Lesson
- `completed`: Boolean completion status
- `xpEarned`: Experience points from lesson
- `completedAt`: Completion timestamp

---

## 🔄 Data Flow & API Architecture

### API Endpoints

#### `/api/lessons`

- **GET**: Returns all available lessons
- **POST**: Creates new lesson (admin functionality)
- Includes fallback to mock data when database unavailable

#### `/api/lessons/[slug]`

- **GET**: Returns specific lesson by slug
- Handles dynamic lesson loading

#### `/api/progress`

- **GET**: Retrieves user progress data
- **POST**: Updates lesson completion and XP

### Data Flow

1. **Homepage Load**: Fetches progress + lessons → displays dashboard
2. **Lesson Access**: Route to `/lessons/[id]` → loads lesson content
3. **Exercise Completion**: Updates progress via API → triggers XP gain
4. **Progress Sync**: Real-time updates across components

---

## 🎯 Core Components Explained

### Main Dashboard (`app/page.tsx`)

- Central hub displaying lesson progress
- Shows total XP, completion status, and next lesson
- Implements loading states and error handling

### Lesson Interface (`app/lessons/[id]/page.tsx`)

- Displays vocabulary cards with pronunciation
- Handles lesson completion logic
- Integrates with progress tracking

### Exercise Component (`components/exercise-component.tsx`)

- Supports multiple exercise types:
  - **MCQ**: Multiple choice questions
  - **Translation**: French ↔ English translation
  - **Listening**: Audio-based comprehension
- Implements XP reward system
- Provides immediate feedback

### Progress Tracker (`components/progress-tracker.tsx`)

- Visual XP progress bars
- Streak tracking
- Completion statistics

---

## 🎮 Learning System Design

### Exercise Types

1. **Multiple Choice Questions (MCQ)**

   - Present French word/phrase with English options
   - Immediate correct/incorrect feedback
   - 10 XP per correct answer

2. **Translation Exercises**

   - Two-way translation (French ↔ English)
   - Text input validation
   - 15 XP per correct answer

3. **Listening Comprehension**
   - Text-to-speech French audio
   - User must identify correct English meaning
   - 20 XP per correct answer

### XP & Progress System

- XP earned per exercise completion
- Lesson completion bonuses
- Progress persistence across sessions
- Streak tracking for engagement

---

## 🛠️ Development Workflow

### Setup Instructions

1. **Clone & Install**

   ```bash
   git clone [repository]
   cd lingua
   pnpm install
   ```

2. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Environment Variables**

   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Development Server**
   ```bash
   pnpm dev
   ```

### Key Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Production build
- `pnpm lint`: Code quality checks
- Database management via Prisma CLI

---

## 🎨 Design System

### Color Scheme

- Primary: Blue-based learning theme
- Success: Green for correct answers
- Error: Red for incorrect attempts
- Neutral: Gray scale for UI elements

### Typography

- **Font**: Poppins (300-700 weights)
- Responsive font scaling
- Accessibility-compliant contrast ratios

### Component Library

- Built on **Radix UI** primitives
- **shadcn/ui** implementation
- Consistent spacing and sizing system
- Dark/light mode support

---

## 🔧 Key Implementation Details

### State Management

- React hooks for component-level state
- API-driven data synchronization
- Local storage for offline functionality

### Performance Optimizations

- Next.js App Router for optimal loading
- Component lazy loading where appropriate
- Image optimization for lesson assets

### Accessibility Features

- Screen reader support via Radix UI
- Keyboard navigation throughout app
- High contrast mode compatibility
- Focus management for exercise flows

---

## 🚀 Deployment Considerations

### Production Setup

- Vercel deployment ready
- Environment variable configuration
- Database migration handling
- Analytics integration

### Performance Monitoring

- Core Web Vitals tracking
- User engagement metrics
- Error boundary implementation

---

## 📈 Future Expansion Opportunities

### Immediate Enhancements

- User authentication system
- Lesson completion certificates
- Advanced progress analytics
- Social features (leaderboards)

### Content Expansion

- Additional language support
- Advanced grammar lessons
- Conversation practice modules
- Cultural context lessons

### Technical Improvements

- Real-time multiplayer exercises
- AI-powered pronunciation feedback
- Spaced repetition algorithm
- Progressive Web App (PWA) features

---

## 🎯 Presentation Key Points

When presenting this project, emphasize:

1. **Modern Tech Stack**: Next.js 14, TypeScript, Prisma
2. **User Experience**: Gamified learning with immediate feedback
3. **Scalability**: Modular architecture supports easy expansion
4. **Accessibility**: Built-in support for diverse users
5. **Performance**: Optimized loading and responsive design
6. **Development Experience**: Type-safe, well-structured codebase

### Demo Flow Suggestion

1. Show homepage with progress overview
2. Navigate through a lesson with vocabulary
3. Complete various exercise types
4. Demonstrate XP gain and progress tracking
5. Highlight responsive design on different devices

This project demonstrates modern web development practices while solving a real-world problem in language education.
