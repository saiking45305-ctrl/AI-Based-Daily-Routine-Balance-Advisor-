# Routine Balance

**AI-Based Daily Routine Balance Advisor**

Routine Balance is a calm, energy-aware daily planning web app that helps people build a doable day around focus, recovery, sleep, mood, movement, connection, and life administration.

Instead of treating productivity as the only goal, Routine Balance creates a balanced day with protected focus time, visible recovery, flexible commitments, and supportive AI guidance.

## Features

- Energy, sleep, and mood inputs
- Daily balance score with live energy, sleep, and recovery signals
- Editable commitments with time, duration, and category
- Routine categories for focus, recovery, movement, connection, and life admin
- Timeline-based daily plan with completion tracking
- Gentle rebalancing action for overloaded days
- AI coach panel that explains the plan in simple, supportive language
- LocalStorage persistence for personal, device-local use
- Dark mode
- Print/save support for a daily routine snapshot
- Responsive layout for desktop, tablet, and mobile
- Unit tests for the AI advisor procedure

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- tRPC
- Express
- Vitest
- Manus built-in LLM integration

## Project Structure

```text
client/
  src/
    pages/Home.tsx          # Main Routine Balance experience
    components/             # Shared UI components
    contexts/ThemeContext.tsx
    lib/trpc.ts             # Typed tRPC client
    index.css               # Product theme and responsive styles
server/
  routers.ts                # Auth and AI advisor procedures
  _core/llm.ts              # Server-side built-in LLM helper
drizzle/                    # Database scaffold from the full-stack template
shared/                     # Shared project constants and types
```

## Getting Started

### Requirements

- Node.js 20+
- pnpm 10+
- A server-side LLM provider configured through the hosting environment

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

The app will start with the Vite/Express development server.

### Validate the project

```bash
pnpm check
pnpm test
pnpm build
```

## AI Coach Configuration

The AI coach is implemented as a server-side tRPC procedure in `server/routers.ts`. The browser sends the current routine context to the server; credentials are never exposed to the client.

In the hosted Manus environment, the built-in LLM credentials are injected automatically through the platform environment. For another hosting provider, replace the implementation in `server/routers.ts` with your preferred server-side LLM client and provide its API key through environment variables.

The AI coach is intended for supportive planning and reflection. It is not medical advice, a mental-health diagnosis, or a replacement for professional care.

## Persistence

Routine inputs and commitments are saved in the browser under the LocalStorage key:

```text
routine-balance-advisor-v1
```

No account is required for the current single-device experience.

## GitHub Description

Use this short description for the GitHub repository:

> AI-powered daily routine planner that balances energy, focus, recovery, sleep, and commitments with supportive personalized coaching.

## Suggested GitHub Topics

```text
ai
productivity
routine-planner
wellbeing
personal-planning
react
typescript
llm
mental-wellness
self-care
```

## Roadmap Ideas

- Recurring routines and weekly trend charts
- Google Calendar or Outlook integration
- Push notifications and gentle reminders
- Custom goals and coaching preferences
- Multi-device sync with user accounts
- Accessibility improvements including full keyboard navigation and screen-reader tuning

## License

Add the license that matches your intended distribution model before publishing the repository. MIT is a common choice for an open-source starter project.
