# Yoom

Yoom is a full-stack video conferencing app built with TypeScript, Next.js, Clerk, Stream, and Tailwind CSS. It gives authenticated users a clean dashboard to start instant meetings, schedule calls, join with invitation links, manage a personal room, review previous meetings, and access recordings from one place.

## Overview

This project uses the Next.js App Router for the frontend, Clerk for authentication, and Stream Video for real-time calling. After signing in, users can move through a protected dashboard, create or join meetings, configure their camera and microphone before entering a room, and switch between different call layouts during the session.

## Features

- Secure sign-in and sign-up flows with Clerk
- Protected meeting routes using middleware
- Start instant meetings from the home dashboard
- Schedule meetings with a date/time picker
- Join meetings directly from an invitation link
- Personal room with a reusable invite link
- Pre-join setup screen with camera, microphone, and device controls
- In-call controls powered by Stream Video
- Switch between grid and speaker layouts
- View meeting participants and call stats
- Browse upcoming meetings, previous meetings, and recordings
- Responsive dashboard UI built with Tailwind CSS
- Local-time hero section on the homepage

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Clerk
- Stream Video React SDK
- Stream Node SDK
- Tailwind CSS
- Radix UI
- React Datepicker

## Project Structure

```text
app/          App Router pages, layouts, and route groups
components/   Reusable UI, meeting, dashboard, and call components
actions/      Server-side actions such as Stream token generation
hooks/        Client hooks for loading calls and meeting data
providers/    App-level providers, including the Stream video provider
constants/    Shared navigation data and static assets
lib/          Utility helpers
public/       Icons and images
```

## Core Routes

- `/` - Home dashboard with quick actions and the local-time hero
- `/upcoming` - Upcoming meetings list
- `/previous` - Previous meetings list
- `/recordings` - Meeting recordings list
- `/personal-room` - Personal room details and shareable invite link
- `/meeting/[id]` - Meeting setup and live meeting room
- `/sign-in` and `/sign-up` - Clerk authentication pages

## Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Notes:

- `NEXT_PUBLIC_BASE_URL` is used when generating shareable meeting links.
- Clerk keys come from your Clerk dashboard.
- Stream keys come from your Stream app dashboard.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd zoom_clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Add the variables shown above to `.env.local`.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the app

Visit `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## How It Works

- Clerk protects the dashboard, meeting pages, and history pages through `middleware.ts`.
- A server action in `actions/stream.actions.ts` creates Stream user tokens for the signed-in user.
- `providers/StreamClientProvider.tsx` initializes the Stream Video client on the client side.
- Meeting data is queried with custom hooks in `hooks/`.
- The meeting room supports layout switching, participant viewing, and built-in Stream call controls.

## Highlights

- Instant meeting flow for quick collaboration
- Scheduled meeting flow with description and start time
- Personal room flow for recurring meetings
- Recordings view for replaying saved sessions
- Responsive sidebar and mobile navigation

## Deployment

You can deploy this project on Vercel or any platform that supports Next.js. Make sure all Clerk and Stream environment variables are configured in your deployment settings before going live.

## License

This project is for educational and portfolio use unless you choose to apply a separate license.
