# Architecture Documentation

## Overview

EaseSplit is built as a modern, client-side-first web application using Next.js 16 App Router, React 19, and TypeScript. The architecture prioritizes privacy, performance, and user experience.

## Core Principles

1. **Privacy-First**: All data stored locally in the browser
2. **Client-Side Processing**: Business logic runs in the browser
3. **Progressive Enhancement**: Works offline with Service Workers
4. **Type Safety**: Full TypeScript coverage
5. **Component Composition**: Modular, reusable components

## Technology Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

### State Management

- **Global State**: React Context API
- **Form State**: React Hook Form
- **Validation**: Zod

### Data Layer

- **Storage**: Browser Local Storage
- **Format**: JSON

### Utilities

- **Date Handling**: date-fns
- **PDF Generation**: jsPDF
- **Charts**: Recharts
- **Notifications**: Sonner

## Directory Structure

```bash
easesplit/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── app/                     # Main application
│   │   ├── page.tsx            # Dashboard
│   │   └── layout.tsx          # App layout
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── features/                # Features page
│   ├── how-it-works/           # How It Works page
│   └── api/                     # API routes
│       ├── send-email/         # Email sending
│       ├── send-breakdown/     # Breakdown emails
│       └── send-settlement-notification/
├── components/                  # React components
│   ├── ui/                     # Base UI components
│   ├── dashboard/              # Dashboard components
│   ├── error-pages/            # Error handling
│   ├── header.tsx              # Site header
│   ├── footer.tsx              # Site footer
│   └── ...                     # Other components
├── lib/                        # Core utilities
│   ├── types.ts               # TypeScript types
│   ├── storage.ts             # Local storage API
│   ├── calculations.ts        # Business logic
│   ├── notifications.ts       # Notification system
│   ├── pdf-generator.ts       # PDF generation
│   ├── app-context.tsx        # App state
│   ├── group-context.tsx      # Group state
│   └── utils.ts               # Helper functions
├── hooks/                      # Custom React hooks
├── public/                     # Static assets
├── styles/                     # Global styles
└── docs/                       # Documentation
```

## Data Architecture

### Data Models

#### Group

```typescript
interface Group {
  id: string
  name: string
  description?: string
  members: Member[]
  expenses: Expense[]
  createdAt: string
  updatedAt: string
}
```

#### Member

```typescript
interface Member {
  id: string
  name: string
  email?: string
  color?: string
}
```

#### Expense

```typescript
interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  splitType: 'equal' | 'percentage' | 'shares' | 'custom'
  splits: Split[]
  category: string
  date: string
  notes?: string
  receipt?: string
}
```

#### Split

```typescript
interface Split {
  memberId: string
  amount: number
  percentage?: number
  shares?: number
}
```

### Data Flow

1. **User Input** → Form Components
2. **Validation** → Zod Schemas
3. **State Update** → Context API
4. **Persistence** → Local Storage
5. **UI Update** → React Re-render

### Storage Strategy

- **Primary**: Browser Local Storage
- **Format**: JSON serialization
- **Key Pattern**: `easesplit_${groupId}`
- **Backup**: Export to PDF/CSV/JSON

## Component Architecture

### Component Hierarchy

```bash
App
├── Header
├── Page Content
│   ├── Dashboard
│   │   ├── DashboardHeader
│   │   ├── GroupSidebar
│   │   ├── QuickStats
│   │   └── Tabs
│   │       ├── ExpensesTab
│   │       ├── MembersTab
│   │       ├── AnalyticsTab
│   │       ├── SettlementTab
│   │       ├── BreakdownTab
│   │       └── SettingsTab
│   └── Modals
│       ├── AddExpenseModal
│       ├── EditExpenseModal
│       ├── GroupSelectorModal
│       ├── ExportImportModal
│       └── CategoryManager
└── Footer
```

### Component Patterns

#### 1. Container/Presenter Pattern

- Container: Manages state and logic
- Presenter: Renders UI

#### 2. Composition Pattern

- Small, focused components
- Composed into larger features

#### 3. Compound Components

- Related components work together
- Shared state through Context

## State Managements

### Context Structure

#### AppContext

- Global app settings
- Theme configuration
- User preferences

#### GroupContext

- Active group data
- Members list
- Expenses list
- Balance calculations

### State Updates

```typescript
// Add expense flow
User Input → Form Validation → Context Update → Storage Save → UI Update
```

## Routing

### App Router Structure

```bash
/                    # Landing page
/app                 # Main dashboard
/about              # About page
/features           # Features showcase
/how-it-works       # User guide
/contact            # Contact form
/api/send-email     # Email API
```

## Performance Optimizations

### 1. Code Splitting

- Route-based splitting
- Dynamic imports for heavy components
- Lazy loading for modals

### 2. Memoization

- React.memo for expensive components
- useMemo for calculations
- useCallback for event handlers

### 3. Image Optimization

- Next.js Image component
- WebP format
- Responsive images

### 4. Bundle Optimization

- Tree shaking
- Minification
- Compression

## Security Considerations

### 1. Data Privacy

- No server-side data storage
- No external API calls (except email)
- No tracking or analytics by default

### 2. Input Validation

- Zod schema validation
- XSS prevention
- CSRF protection (Next.js built-in)

### 3. Email Security

- SMTP over TLS
- App-specific passwords
- Rate limiting (hosting platform)

## Error Handling

### Error Boundary Strategy

```bash
Global Error Boundary
├── Page Error Boundaries
│   ├── Dashboard Error Boundary
│   └── Form Error Boundaries
└── Component Error Boundaries
```

### Error Types

- Network errors
- Validation errors
- Storage errors
- Calculation errors

## Testing Strategy

### Unit Tests

- Component tests (React Testing Library)
- Utility function tests
- Calculation logic tests

### Integration Tests

- User flow tests
- Form submission tests
- Data persistence tests

### E2E Tests

- Critical path tests
- Multi-browser tests

## Deployment Architecture

### Production Environment

```bash
User → CDN (Vercel Edge) → Next.js App → API Routes → SMTP Server
                                      ↓
                              Browser Local Storage
```

### Build Process

1. TypeScript compilation
2. Next.js optimization
3. Static generation
4. Asset optimization
5. Deployment to edge network

## Scalability

### Client-Side Scalability

- Efficient algorithms for calculations
- Pagination for large datasets
- Virtual scrolling for long lists

### Server-Side Scalability

- Minimal server requirements
- Edge function for email
- Stateless architecture

## Future Architecture Considerations

### Potential Enhancements

1. **PWA**: Full Progressive Web App support
2. **Sync**: Optional cloud sync with encryption
3. **Collaborative**: Real-time collaboration features
4. **Mobile**: React Native mobile app
5. **Plugins**: Plugin architecture for extensions

### Migration Path

- Backward compatible data format
- Version tracking
- Migration utilities
