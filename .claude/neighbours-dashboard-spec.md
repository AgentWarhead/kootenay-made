# The Neighbours Dashboard — Build Spec

## Overview
Client portal for Kootenay Made Digital paying customers. Login-protected dashboard with progressive learning path (The Trailhead), guides, video library, support tickets, and community forum.

## Stack
- **Auth & DB:** Supabase (email + password)
- **Frontend:** Next.js 16 App Router (existing project)
- **Styling:** Tailwind 4 (existing)
- **Animations:** Framer Motion (existing)
- **Fonts:** Cabinet Grotesk (headlines, via Fontshare CDN) + General Sans (body, already self-hosted)

## Supabase Setup
- Project name: kootenay-made
- Tables: profiles, guides, videos, faq, tickets, ticket_replies, forum_posts, forum_replies, achievements, user_achievements, user_guide_progress
- RLS enabled on all tables
- Admin role via profiles.is_admin boolean

## Database Schema

### profiles
- id (uuid, FK to auth.users)
- business_name (text)
- website_url (text)
- package_tier (text: 'starter' | 'growth' | 'premium')
- avatar_url (text, nullable)
- bio (text, nullable)
- is_admin (boolean, default false)
- onboarding_complete (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)

### guides
- id (uuid, PK)
- title (text)
- slug (text, unique)
- content (text, markdown)
- excerpt (text)
- category (text: 'trailhead' | 'quick-wins' | 'deep-dives')
- trailhead_milestone (int, nullable, 1-5)
- trailhead_order (int, nullable)
- difficulty (text: 'quick' | 'standard' | 'advanced')
- read_time_minutes (int)
- published (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)

### user_guide_progress
- id (uuid, PK)
- user_id (uuid, FK to auth.users)
- guide_id (uuid, FK to guides)
- completed (boolean, default false)
- progress_percent (int, default 0)
- completed_at (timestamptz, nullable)
- created_at (timestamptz)

### videos
- id (uuid, PK)
- title (text)
- youtube_url (text)
- thumbnail_url (text, nullable)
- category (text)
- description (text)
- duration_seconds (int)
- order_index (int)
- published (boolean, default false)
- created_at (timestamptz)

### faq
- id (uuid, PK)
- question (text)
- answer (text)
- category (text)
- order_index (int)

### tickets
- id (uuid, PK)
- user_id (uuid, FK to auth.users)
- subject (text)
- message (text)
- status (text: 'open' | 'in_progress' | 'resolved')
- created_at (timestamptz)
- updated_at (timestamptz)

### ticket_replies
- id (uuid, PK)
- ticket_id (uuid, FK to tickets)
- user_id (uuid, FK to auth.users)
- message (text)
- is_admin (boolean)
- created_at (timestamptz)

### forum_posts
- id (uuid, PK)
- user_id (uuid, FK to auth.users)
- title (text)
- content (text)
- category (text: 'wins' | 'questions' | 'tips' | 'show-work')
- pinned (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)

### forum_replies
- id (uuid, PK)
- post_id (uuid, FK to forum_posts)
- user_id (uuid, FK to auth.users)
- content (text)
- helpful_count (int, default 0)
- created_at (timestamptz)

### achievements
- id (uuid, PK)
- slug (text, unique)
- name (text)
- description (text)
- icon_name (text)
- order_index (int)

### user_achievements
- id (uuid, PK)
- user_id (uuid, FK to auth.users)
- achievement_id (uuid, FK to achievements)
- earned_at (timestamptz)

## Route Structure

### Public
- /login — email + password login
- /forgot-password — password reset

### Protected (requires auth)
- /dashboard — home (The Lodge)
- /dashboard/trailhead — progressive learning path
- /dashboard/guides — all guides (3 lanes)
- /dashboard/guides/[slug] — guide reader
- /dashboard/videos — video library
- /dashboard/community — The Campfire forum
- /dashboard/community/[id] — single post + replies
- /dashboard/community/new — create post
- /dashboard/account — profile, settings, achievements
- /dashboard/support — FAQ + tickets (could also be a floating panel)

### Admin (requires auth + is_admin)
- /admin — overview
- /admin/guides — manage guides (CRUD + markdown editor)
- /admin/videos — manage videos
- /admin/clients — manage client accounts
- /admin/tickets — ticket queue

## Layout Architecture

Dashboard routes get their own layout (no marketing nav/footer):
- src/app/(dashboard)/layout.tsx — sidebar + topbar + bottom tabs
- src/app/(dashboard)/dashboard/page.tsx — The Lodge home
- src/app/(auth)/login/page.tsx — login page
- etc.

LayoutShell.tsx needs update: strip nav/footer for /dashboard and /admin routes too.

## Design Tokens (Dashboard-specific)

### Light Mode (default)
- --dash-surface: #FAFAF8 (morning frost)
- --dash-card: #FFFFFF
- --dash-sidebar: #F0EDE8 (warm linen)
- --dash-text: #2D3436 (granite)
- --dash-muted: #636E72 (river stone)
- --dash-accent: #C87941 (bluffs copper) — reuse existing --copper
- --dash-success: #4A7C59 (cedar)
- --dash-alert: #C0392B (wildfire)

### Dark Mode
- --dash-surface: #1C1E26
- --dash-card: #252836
- --dash-sidebar: #1C1E26
- --dash-text: #E8E4DF
- --dash-muted: #8B8D97
- --dash-accent: #D4944A

## Typography
- Headlines: Cabinet Grotesk (via Fontshare CDN variable)
- Body/UI: General Sans (already self-hosted)
- Code: JetBrains Mono (via Fontshare CDN)
- Guide content: General Sans 18px, line-height 1.8, max-width 680px

## Kootenay Infusion
- Topo line SVG background texture at low opacity throughout
- Seasonal greeting rotation (spring/summer/fall/winter)
- Kootenay-named loading states ("Stoking the fire...", "Checking trail conditions...")
- Achievement badges named after local landmarks
- Empty states with trail/nature metaphors
- Footer: "Built in the West Kootenays. 🏔️"

## Trailhead System (5 Milestones)
1. Basecamp — "Claim Your Online Identity" (Google Business, domain basics)
2. The Forest — "Make Your Website Work For You" (their site's features)
3. The Ridge — "Get Found by Customers" (SEO basics, Google Maps)
4. The Summit — "Turn Visitors Into Customers" (reviews, CTAs, email)
5. The Vista — "Grow & Scale" (ads, social, advanced strategies)

Each milestone: 3-5 bite-sized guides (5-10 min each).
Completion: confetti + badge + community visibility.
Target: 30-45 days at 15 min/day.

## Phase 1 (MVP)
1. Supabase project + schema + RLS
2. Auth (login/logout/password reset/change)
3. Dashboard layout (sidebar, topbar, bottom tabs, responsive)
4. Dashboard home (The Lodge)
5. Trailhead system (visual path + milestone tracking)
6. Guides system (reader, progress tracking, 3 lanes)
7. Support (floating panel, FAQ search, ticket submission)

## Phase 2
8. Video library
9. Community forum (The Campfire)
10. Achievement system
11. Admin panel
12. Dark mode toggle
13. Seasonal awareness
