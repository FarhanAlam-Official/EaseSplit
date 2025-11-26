# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: 18.x or later
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Initial Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/easesplit.git
   cd easesplit
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your SMTP credentials (see [ENVIRONMENT.md](./ENVIRONMENT.md))

4. **Start development server**:

   ```bash
   pnpm dev
   ```

5. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature

1. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test your changes**:

   ```bash
   pnpm lint
   pnpm build
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**:

   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```bash
feat: add expense categorization
fix: resolve settlement calculation bug
docs: update API documentation
style: format with prettier
refactor: simplify expense splitting logic
```

## Project Structure

```bash
easesplit/
├── app/                  # Next.js app router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   ├── app/             # Main app pages
│   └── api/             # API routes
├── components/           # React components
│   ├── ui/              # Base UI components
│   ├── dashboard/       # Dashboard components
│   └── ...
├── lib/                 # Core logic
│   ├── types.ts         # TypeScript types
│   ├── storage.ts       # Storage utilities
│   ├── calculations.ts  # Business logic
│   └── ...
├── hooks/               # Custom React hooks
├── public/              # Static assets
├── styles/              # Global styles
└── docs/                # Documentation
```

## Code Style

### TypeScript

- Use strict TypeScript
- Define types in `lib/types.ts`
- Avoid `any` type
- Use interfaces for objects
- Use type aliases for unions

Example:

```typescript
interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  date: string
}

type SplitType = 'equal' | 'percentage' | 'shares' | 'custom'
```

### React Components

- Use functional components
- Use TypeScript for props
- Keep components small and focused
- Extract reusable logic to hooks

Example:

```typescript
interface ExpenseCardProps {
  expense: Expense
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  return (
    // Component JSX
  )
}
```

### Naming Conventions

- **Files**: kebab-case (`expense-card.tsx`)
- **Components**: PascalCase (`ExpenseCard`)
- **Functions**: camelCase (`calculateTotal`)
- **Constants**: UPPER_CASE (`MAX_EXPENSES`)
- **Types/Interfaces**: PascalCase (`Expense`, `Member`)

### File Organization

```typescript
// 1. Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"

// 2. Types
interface Props {
  // ...
}

// 3. Component
export function Component({ }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Functions
  const handleClick = () => {
    // ...
  }
  
  // 6. Render
  return (
    // JSX
  )
}
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

Create test files next to components:

```bash
components/
├── expense-card.tsx
└── expense-card.test.tsx
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { ExpenseCard } from './expense-card'

describe('ExpenseCard', () => {
  it('renders expense details', () => {
    const expense = {
      id: '1',
      description: 'Dinner',
      amount: 50,
      paidBy: 'John',
      date: '2024-01-01'
    }
    
    render(<ExpenseCard expense={expense} />)
    
    expect(screen.getByText('Dinner')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument()
  })
})
```

## Linting & Formatting

### ESLint

Check for linting issues:

```bash
pnpm lint
```

Fix auto-fixable issues:

```bash
pnpm lint:fix
```

### Prettier

Format code:

```bash
pnpm format
```

Check formatting:

```bash
pnpm format:check
```

## Building

### Development Build

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm start
```

### Type Checking

```bash
pnpm type-check
```

## Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Browser DevTools

- React DevTools extension
- Redux DevTools (if using Redux)
- Network tab for API calls
- Console for errors

### Logging

Use appropriate log levels:

```typescript
console.log('Info message')
console.warn('Warning message')
console.error('Error message')
```

## Performance

### Optimization Checklist

- [ ] Use React.memo for expensive components
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for event handlers
- [ ] Lazy load components with dynamic imports
- [ ] Optimize images with Next.js Image
- [ ] Minimize bundle size
- [ ] Use proper caching strategies

### Performance Monitoring

```typescript
// Measure component render time
console.time('ExpenseCard render')
// Component code
console.timeEnd('ExpenseCard render')
```

## Accessibility

### Guidelines

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Use ARIA labels where needed
- Test with screen readers
- Maintain color contrast ratios

### Tools

- Lighthouse audit
- axe DevTools extension
- Wave browser extension

## Common Tasks

### Adding a New Component

1. Create component file in appropriate directory
2. Define TypeScript props interface
3. Implement component
4. Add to index exports (if needed)
5. Write tests
6. Document usage

### Adding a New Feature

1. Create feature branch
2. Implement UI components
3. Add business logic
4. Update types if needed
5. Add tests
6. Update documentation
7. Create pull request

### Fixing a Bug

1. Reproduce the bug
2. Write a failing test
3. Fix the bug
4. Ensure test passes
5. Check for related bugs
6. Submit pull request

## Troubleshooting

### Common Issues

**Port already in use**:

```bash
# Kill process on port 3000
npx kill-port 3000
```

**Module not found**:

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

**Type errors**:

```bash
# Clear TypeScript cache
rm -rf .next/cache
```

**Build errors**:

```bash
# Clear build cache
rm -rf .next
pnpm build
```

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tool

- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Postman](https://www.postman.com/) - API testing

### Community

- GitHub Issues
- Discussions
- Discord (if available)

## Tips

1. **Keep components small** - Easier to test and maintain
2. **Write tests first** - TDD helps catch bugs early
3. **Use TypeScript strictly** - Prevents runtime errors
4. **Document complex logic** - Help future developers
5. **Review your own PRs** - Catch issues before review
6. **Ask for help** - Don't hesitate to reach out
