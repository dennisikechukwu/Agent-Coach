# AgentCoach — AI-Powered Accountability with Real Stakes

> **Stake your money on your goals. An autonomous AI coach holds you accountable with real financial consequences.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Current Limitations (Hackathon MVP)](#current-limitations-hackathon-mvp)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)

---

## 🎯 Overview

**AgentCoach** is a Web3-enabled accountability platform that combines financial incentives with AI coaching. Users set goals, stake USDC on Base network, and receive daily coaching from an AI agent powered by Google's Gemini. The platform verifies progress through:

- **AI Photo Verification** — Gemini Vision analyzes check-in photos for evidence of progress
- **Persistent Coaching** — Context-aware chat history maintains ongoing accountability
- **Real Financial Stakes** — Failed goals result in lost stakes; completed goals earn rewards
- **Wallet-Native** — Seamless integration with Wagmi, RainbowKit, and Base network

**Status:** Hackathon MVP (April 2026)

---

## 🤔 Problem Statement

Traditional habit-tracking apps fail because:
- **No skin in the game** — Users can reset goals without consequence
- **Shallow accountability** — Self-tracking is easily manipulated
- **Lack of personalization** — Generic reminders don't motivate
- **Abandoned after weeks** — No mechanism to retain engagement over time

Result: 80% of habit-tracking app users abandon the app within 30 days.

---

## 💡 Solution

AgentCoach introduces **financial accountability** backed by:

1. **Real Money Stakes** — Set goals and lock USDC on-chain via fiat-to-crypto checkout (MoonPay)
2. **AI Verification** — Gemini Vision reviews check-in photos; only genuine progress counts
3. **Autonomous Coaching** — An AI coach provides personalized motivation, tracking context across all interactions
4. **Transparent Ledger** — All transactions recorded on-chain; stakes and rewards visible to the network

This creates a powerful incentive: **people follow through because they have real money on the line.**

---

## ✨ Key Features

### For Users
- 🏆 **Set Goals** — Define habit-based goals with custom duration (e.g., "Gym 3x/week", "Code 2 hours daily")
- 💰 **Stake USDC** — Lock tokens as collateral; loss is tangible
- 📸 **Photo Check-Ins** — Submit daily progress evidence; AI verifies authenticity
- 💬 **AI Coach** — Chat with AgentCoach bot for motivation, goal creation, and feedback
- 📊 **Dashboard Analytics** — Real-time adherence tracking, streak counters, treasury balance
- 🏅 **Network Visibility** — See how your adherence compares to 84%+ network participants

### For the Platform
- 🤖 **Gemini Vision** — Context-aware photo analysis with strict verification
- 🔐 **Web3 Integration** — Wagmi-powered wallet management (Multi-chain: Mainnet, Polygon, Optimism, Arbitrum, Base)
- 💾 **Persistent State** — Supabase for chat history, goals, check-ins, user profiles
- 🔗 **MoonPay Integration** — Fiat-to-USDC onboarding for Web2 users without crypto wallets
- ⚡ **Real-Time Updates** — React 19 with TanStack Query for optimistic updates

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16** — React 19 + App Router + TypeScript
- **Tailwind CSS 4** — Utility-first styling with @tailwindcss/postcss
- **Framer Motion** — Smooth animations (landing page, mobile menu)
- **Lucide React** — Icon library (20px SVGs)
- **Chart.js + react-chartjs-2** — Real-time analytics visualization

### Web3
- **Wagmi 3.6** — Ethereum hooks & wallet state management
- **RainbowKit 2.2** — Beautiful wallet connection UI
- **Viem 2.47** — Lightweight Ethereum client
- **@metamask/connect-evm** — Direct MetaMask integration
- **@walletconnect/ethereum-provider** — WalletConnect v2 support

### Backend
- **Next.js API Routes** — TypeScript server-side functions
- **Google Generative AI SDK** — Gemini 2.5-flash model + Vision API
- **Supabase** — PostgreSQL + real-time subscriptions + Auth
- **TanStack React Query** — Server state management

### AI & Verification
- **Google Gemini 2.5-flash** — Fast, vision-capable model for photo analysis
- **System Prompt Engineering** — Strict verification instructions for photo legitimacy

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          User Browser                            │
│  (Next.js Client - React 19 + TypeScript)                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴─────────────┬──────────────────┐
        ▼                          ▼                  ▼
   API Routes              Wallet Providers    Framer Motion
   /api/chat               (Wagmi/RainbowKit)  (Landing UX)
   /api/agent
   /api/sync
        │
        ├─────────────────────────────────────────────────┐
        │                                                 │
        ▼                                                 ▼
   Supabase PostgreSQL                    Google Gemini API
   ├─ profiles                            ├─ Chat (Coaching)
   ├─ goals                               └─ Vision (Photo Check-in)
   ├─ check_ins
   └─ messages
```

### Data Flow: Goal Creation

1. User types `/goal gym 3x/week $50` in AI Chat widget
2. Frontend sends message to `/api/chat`
3. Gemini receives system prompt, responds with `[MOONPAY_TRIGGER]`
4. Frontend renders MoonPay Fiat-to-Crypto checkout
5. User completes payment (simulated in MVP)
6. Goal + payment record saved to Supabase via `addGoal()`
7. AI Coach confirms goal is ACTIVE

### Data Flow: Photo Verification

1. User uploads check-in photo in Dashboard
2. Frontend base64-encodes image + sends to `/api/agent`
3. Gemini Vision analyzes image against goal context
4. Returns `{ verified: boolean, analysis: string, confidence: 0.0-1.0 }`
5. Check-in record + verification written to `check_ins` table
6. Message logged to `messages` table for persistent context
7. AI Coach responds with approval/rejection + feedback

---

## 🔌 API Endpoints

### POST `/api/chat`

**Purpose:** AI coaching chat interface

**Request:**
```json
{
  "message": "I want to set a goal to code 2 hours daily for $50",
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f42ed7"
}
```

**Response:**
```json
{
  "response": "**Goal Setup In Progress**\nI see you want to commit 2 hours daily to coding...\n[MOONPAY_TRIGGER]"
}
```

**Behavior:**
- Maintains conversation history (fetches last 10 messages from DB)
- Gemini system prompt enables `/goal`, `/status`, `/help` commands
- Returns `[MOONPAY_TRIGGER]` when user explicitly asks to set a goal
- Logs all AI responses to `messages` table for future context

### POST `/api/agent`

**Purpose:** Photo-based goal verification

**Request:**
```json
{
  "action": "verify-photo",
  "payload": {
    "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "goalId": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
    "goalTitle": "Gym 3x/week",
    "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f42ed7"
  }
}
```

**Response:**
```json
{
  "verified": true,
  "analysis": "Clear evidence of gym workout. Barbell and dumbbells visible in frame.",
  "confidence": 0.92
}
```

**Behavior:**
- Analyzes image using Gemini Vision 2.5-flash
- Extracts base64 data and MIME type automatically
- Has fallback for Gemini failures (returns generic approval + 0.85 confidence)
- Saves check-in + message to DB
- Includes confidence score for transparency

### POST `/api/sync`

**Purpose:** Sync user data and wallet state

**Status:** Currently a placeholder; intended for:
- Fetching user profile stats
- Syncing goal status
- Treasury balance updates
- Payment verification with MoonPay webhooks

---

## 🗄 Database Schema

### `profiles` Table
```sql
CREATE TABLE public.profiles (
  wallet_address TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  total_staked NUMERIC DEFAULT 0.0,
  total_earned NUMERIC DEFAULT 0.0
);
```

### `goals` Table
```sql
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT REFERENCES profiles(wallet_address),
  title TEXT NOT NULL,
  stake_amount NUMERIC NOT NULL,
  duration_days INT NOT NULL,
  status goal_status DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Enum:** `goal_status = 'active' | 'completed' | 'failed'`

### `check_ins` Table
```sql
CREATE TABLE public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES goals(id),
  image_url TEXT NOT NULL,
  ai_status ai_status DEFAULT 'pending',
  ai_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Enum:** `ai_status = 'pending' | 'approved' | 'rejected'`

### `messages` Table
```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT REFERENCES profiles(wallet_address),
  content TEXT NOT NULL,
  is_user BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Note on RLS:** For hackathon, all RLS policies are simplified to allow service role full access. Production implementation requires per-user policies.

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ (recommend 20 LTS)
- npm or yarn
- A Supabase project with tables initialized
- Google Generative AI API key (Gemini access)
- WalletConnect project ID (for rainbow-kit multi-chain support)

### 1. Clone & Install

```bash
cd my-app
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env.local` file in the `my-app/` directory:

```bash
# Google AI (Gemini)
GEMINI_API_KEY=<your-gemini-api-key>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Wallet Connect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your-project-id>
```

See [Environment Variables](#environment-variables) section below for detailed instructions.

### 3. Initialize Database

Run the SQL schema from `supabase/schema.sql`:

```bash
# Via Supabase Dashboard:
1. Navigate to SQL Editor
2. Create a new query
3. Paste contents of supabase/schema.sql
4. Click Run
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🔐 Environment Variables

### Required

| Variable | Description | Where to find |
|----------|-------------|----------------|
| `GEMINI_API_KEY` | Google AI API key for Gemini 2.5-flash | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for server-side calls) | Supabase → Settings → API (Service Role) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | For multi-wallet support | [WalletConnect Cloud](https://cloud.walletconnect.com) |

### Optional (with Defaults)

```bash
# If not set, falls back to demo project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=e0e8e4a90f13ddbaddc9db74a58bfa79
```

### .env.local Template

```bash
# Copy this to my-app/.env.local and fill in your values

# Google AI Setup
# 1. Go to https://aistudio.google.com/app/apikey
# 2. Click "Create API Key"
# 3. Copy the key
GEMINI_API_KEY=

# Supabase Setup
# 1. Go to https://database.new or your existing project
# 2. Go to Settings → API
# 3. Copy these values
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# WalletConnect (optional, has fallback)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

---

## 📖 Usage Guide

### Landing Page

1. Click **"Connect Wallet"** in top-right
2. Choose wallet (MetaMask, Rainbow, Coinbase, etc.)
3. Sign transaction to verify ownership
4. Redirects to `/dashboard`

### Dashboard

#### Tab 1: Dashboard (Default)
- **Consistency Summary** — Shows your current adherence score (0-100)
- **Treasury Widget** — Displays connected wallet balance
- **Consistency Chart** — 8-day historical adherence visualization
- **AI Chat** — Your AgentCoach chat interface

#### Tab 2: Goals
- View active goals with progress
- See failed/completed goals (historical)
- Status: Active, Completed, or Failed

#### Tab 3: Analytics
- Deep dive into performance metrics
- Network comparison ("You're in top 16% of network")
- Streaks and consistency trends

### Creating a Goal via Chat

In the **AI Chat Widget**, type:

```
/goal gym 3x/week $50
/goal code 2 hours daily $25
/goal read 30 pages daily $30
/goal meditation 15 mins daily $10
```

**What happens:**
1. AgentCoach recognizes `/goal` keyword
2. Responds with `[MOONPAY_TRIGGER]` UI
3. Shows checkout for your specified USDC amount
4. Click **"Lock [Amount] USDC Stake"** button
5. Goal becomes ACTIVE after payment

### Daily Check-Ins

1. Go to **Goals** tab
2. Find your active goal
3. Click **"Photo Check-In"**
4. Upload image from camera roll or take live photo
5. AgentCoach analyzes with Gemini Vision
6. AI confirms verification status

---


## 🤝 Contributing

This is a hackathon project, but we welcome improvements:

1. **Bug Reports** — Open an issue with reproduction steps
2. **Feature Requests** — Describe the use case + why it matters
3. **Code Contributions** — Fork, create feature branch, submit PR

### Development Workflow

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server with hot reload
npm run dev

# Build for production
npm build

# Lint code
npm run lint
```

### Code Style
- TypeScript strict mode enabled
- Tailwind CSS Syntax (@apply, @layer)
- Component organization: one file per component
- API routes in `app/api/**/route.ts` with clear POST request handlers

---

## 📄 License

This project is released as-is for hackathon evaluation purposes. Future licensing (MIT, GPL, etc.) TBD.

---

## 💬 Support

**Questions or issues?** 

- Check [Environment Variables](#environment-variables) section first
- Review [API Endpoints](#api-endpoints) for request/response formats
- Look at component implementations in `components/` for real-world usage

---

## 🎉 Acknowledgments

- **Google Gemini 2.5-flash** — AI coaching + photo verification
- **Supabase** — Database + real-time backend
- **Wagmi + RainbowKit** — Wallet integration
- **Next.js 16 + React 19** — Framework foundation
- **Tailwind CSS 4** — Styling

---

**Built with 🔥 for the Web3 Accountability Hackathon — April 2026**
