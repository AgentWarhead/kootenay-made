# Vercel Environment Variables

These must be added to the Vercel project settings before deploying:

## Required Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. https://xxx.supabase.co) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, never expose to client) |

## How to Add

1. Go to [vercel.com](https://vercel.com) → your project → Settings → Environment Variables
2. Add each variable above for **Production**, **Preview**, and **Development** environments
3. For `SUPABASE_SERVICE_ROLE_KEY` — mark as **sensitive** and ensure it is NOT prefixed with `NEXT_PUBLIC_`

## Values

Find the values in `.env.local` at the project root, or in the Supabase dashboard under:
Project Settings → API → Project URL & API Keys
