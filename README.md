# EaseSplit

**Split bills. Stay friends.**

EaseSplit is a privacy-first, lightning-fast bill splitting application built with Next.js 16, React 19, and TypeScript. Designed for groups who want to split expenses without the hassle of creating accounts or sharing personal data.

## Features

- **100% Private**: All data stays on your device - no servers, no databases, no tracking
- **Lightning Fast**: Split bills in seconds, not minutes
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Group Management**: Create and manage multiple groups with custom members
- **Flexible Splitting**: Split expenses equally, by percentage, shares, or custom amounts
- **Smart Analytics**: Visual insights into spending patterns and categories
- **Easy Settlement**: Minimize transfers with optimized settlement suggestions
- **Export Options**: Export to PDF, CSV, or JSON anytime
- **Works Offline**: Fully functional without an internet connection
- **No Account Required**: Start using immediately - no signup or installation needed

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form, Zod
- **PDF Generation**: jsPDF
- **Notifications**: Sonner
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/easesplit.git
   cd easesplit
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Starts the development server
- `pnpm build` - Builds the application for production
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs ESLint to check for code issues

## Project Structure

```bash
.
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Business logic and utilities
├── public/              # Static assets
├── styles/              # Global styles
├── hooks/               # Custom React hooks
├── docs/                # Documentation
└── ...
```

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs) folder:

- **[API Documentation](./docs/API.md)** - API routes and endpoints
- **[Architecture](./docs/ARCHITECTURE.md)** - System architecture and design
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to Vercel, Netlify, or self-host
- **[Development Guide](./docs/DEVELOPMENT.md)** - Set up development environment
- **[Environment Variables](./docs/ENVIRONMENT.md)** - Configuration and setup
- **[FAQ](./docs/FAQ.md)** - Frequently asked questions
- **[Changelog](./docs/CHANGELOG.md)** - Version history and updates
- **[Code of Conduct](./docs/CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](./docs/SECURITY.md)** - Security and vulnerability reporting
- **[Notification System](./docs/NOTIFICATION_SYSTEM.md)** - Email notification details

## Key Components

### Dashboard

- **Expenses Tab**: View and manage all group expenses
- **Members Tab**: Manage group members and their balances
- **Analytics Tab**: Visual spending insights and breakdowns
- **Settlement Tab**: Optimized payment suggestions to settle debts
- **Breakdown Tab**: Detailed expense categorization
- **Settings Tab**: Group configuration and export options

### Core Features

- **Add Expense Modal**: Intuitive form for recording new expenses
- **Edit Expense Modal**: Modify existing expenses
- **Group Management**: Create, switch, and manage multiple groups
- **Category Management**: Customizable expense categories
- **Export/Import**: Backup and restore data in multiple formats

## Privacy & Security

EaseSplit prioritizes your privacy:

- **Local Storage**: All data is stored locally in your browser
- **No Tracking**: No analytics, cookies, or user tracking
- **No Servers**: No data is sent to any external servers
- **Open Source**: Fully transparent codebase

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for detailed instructions.

Quick steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please also read our [Code of Conduct](./docs/CODE_OF_CONDUCT.md) before contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email <hello@easesplit.app> or open an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
