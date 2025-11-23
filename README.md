# Blog Platform

A modern, full-featured blog platform built with Next.js 16, featuring server-side rendering, real-time editing, and comprehensive tooling for code quality.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Yup validation
- **Rich Text Editor**: TipTap
- **UI Components**: Radix UI
- **Fonts**: Inter, Source Serif 4, JetBrains Mono

## Features

- 📝 Create, edit, and delete blog posts
- 🎨 Rich text editor with formatting options
- 🖼️ Automatic banner image generation (Picsum API)
- 📱 Responsive design with dark mode support
- 🔍 SEO optimized with metadata and sitemap
- 🚀 Server-side rendering for better performance
- 🔐 Type-safe with full TypeScript support

## Development Tools

### Code Quality
- **ESLint**: Enforces clean code standards
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit checks
- **Lint-staged**: Runs linters on staged files
- **Commitlint**: Enforces conventional commit messages

### Configuration
- `eslint.config.mjs` - ESLint rules for code quality
- `.lintstagedrc.json` - Lint-staged configuration
- `.husky/pre-commit` - Pre-commit hook
- `.husky/commit-msg` - Commit message validation
- `commitlint.config.js` - Conventional commits rules
- `next.config.ts` - Next.js optimization settings

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and stores (Zustand)
├── schemas/         # Validation schemas
└── types/           # TypeScript types
```

## Commit Convention

Commits follow conventional commit format:
```
feat: add new feature
fix: fix a bug
docs: documentation changes
refactor: code refactoring
```

## License

MIT
