# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Run type checking with svelte-check
- `bun run check:watch` - Run type checking in watch mode
- `bun run lint` - Run linting (prettier + eslint)
- `bun run format` - Format code with prettier

## Architecture Overview

This is a SvelteKit application for generic clinic management platform called Clinikal. The app helps small clinics manage their patients and their data.

### Tech Stack
- **Framework**: Svelte 5, SvelteKit with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **UI**: Tailwind CSS + shadcn-svelte components
- **Deployment**: Cloudflare Pages (adapter-cloudflare)

### Key Architecture Patterns

**Database Layer** (`src/lib/server/database/`):
- Centralized Supabase client in `index.ts`
- Table enum defines database tables: `patients`, `users`, `users_settings`, `patients_view_settings`
- Separate modules for each table's operations

**Authentication** (`src/lib/server/authentication.ts`):
- Custom Clerk integration with JWT verification
- Session management through locals
- Protected routes configuration
- User metadata synchronization between Clerk and database

**Route Structure**:
- `/` - Dashboard
- `/patients` - Patients management table
- `/patients/[patient_id]` - Specific patient management page
- `/settings` - User configuration
- `/plan` - Subscription management
- `/integrations` - Third-party integrations
- API routes under `/api/` for server-side operations

**Component Architecture**:
- `src/lib/components/ui/` - Base shadcn-svelte components
- `src/lib/components/` - Application-specific components

**Data Models** (`src/lib/models/`):

**Server-Side Features**:

### Environment Variables
- Supabase configuration
- Clerk authentication keys
