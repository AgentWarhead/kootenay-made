-- Neighbours Dashboard Schema
-- Kootenay Made Digital

-- ============================================
-- PROFILES
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  business_name text not null default '',
  website_url text default '',
  package_tier text not null default 'starter' check (package_tier in ('starter', 'growth', 'premium')),
  avatar_url text,
  bio text,
  is_admin boolean not null default false,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Users can update their own profile (but not is_admin)
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Admins can update all profiles
create policy "Admins can update all profiles" on public.profiles
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Community members can see each other's basic info
create policy "Community can view profiles" on public.profiles
  for select using (auth.role() = 'authenticated');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, business_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'business_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- GUIDES
-- ============================================
create table public.guides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null default '',
  excerpt text not null default '',
  category text not null default 'quick-wins' check (category in ('trailhead', 'quick-wins', 'deep-dives')),
  trailhead_milestone int check (trailhead_milestone between 1 and 5),
  trailhead_order int,
  difficulty text not null default 'standard' check (difficulty in ('quick', 'standard', 'advanced')),
  read_time_minutes int not null default 5,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.guides enable row level security;

-- Anyone authenticated can read published guides
create policy "Authenticated users can read published guides" on public.guides
  for select using (auth.role() = 'authenticated' and published = true);

-- Admins can do everything with guides
create policy "Admins full access to guides" on public.guides
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- USER GUIDE PROGRESS
-- ============================================
create table public.user_guide_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  guide_id uuid references public.guides on delete cascade not null,
  completed boolean not null default false,
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, guide_id)
);

alter table public.user_guide_progress enable row level security;

create policy "Users can manage own progress" on public.user_guide_progress
  for all using (auth.uid() = user_id);

-- Admins can view all progress
create policy "Admins can view all progress" on public.user_guide_progress
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- VIDEOS
-- ============================================
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_url text not null,
  thumbnail_url text,
  category text not null default 'general',
  description text not null default '',
  duration_seconds int not null default 0,
  order_index int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;

create policy "Authenticated users can read published videos" on public.videos
  for select using (auth.role() = 'authenticated' and published = true);

create policy "Admins full access to videos" on public.videos
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- FAQ
-- ============================================
create table public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'general',
  order_index int not null default 0
);

alter table public.faq enable row level security;

create policy "Authenticated users can read FAQ" on public.faq
  for select using (auth.role() = 'authenticated');

create policy "Admins full access to FAQ" on public.faq
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- TICKETS
-- ============================================
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  subject text not null,
  message text not null,
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tickets enable row level security;

create policy "Users can manage own tickets" on public.tickets
  for all using (auth.uid() = user_id);

create policy "Admins full access to tickets" on public.tickets
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- TICKET REPLIES
-- ============================================
create table public.ticket_replies (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.tickets on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  message text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.ticket_replies enable row level security;

-- Users can read replies on their own tickets
create policy "Users can read own ticket replies" on public.ticket_replies
  for select using (
    exists (select 1 from public.tickets where id = ticket_id and user_id = auth.uid())
  );

-- Users can create replies on their own tickets
create policy "Users can reply to own tickets" on public.ticket_replies
  for insert with check (
    auth.uid() = user_id and
    exists (select 1 from public.tickets where id = ticket_id and user_id = auth.uid())
  );

-- Admins full access
create policy "Admins full access to ticket replies" on public.ticket_replies
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- FORUM POSTS
-- ============================================
create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text not null,
  category text not null default 'questions' check (category in ('wins', 'questions', 'tips', 'show-work')),
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.forum_posts enable row level security;

-- All authenticated users can read posts
create policy "Authenticated users can read posts" on public.forum_posts
  for select using (auth.role() = 'authenticated');

-- Users can create posts
create policy "Users can create posts" on public.forum_posts
  for insert with check (auth.uid() = user_id);

-- Users can update own posts
create policy "Users can update own posts" on public.forum_posts
  for update using (auth.uid() = user_id);

-- Admins full access
create policy "Admins full access to forum posts" on public.forum_posts
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- FORUM REPLIES
-- ============================================
create table public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.forum_posts on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  helpful_count int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.forum_replies enable row level security;

create policy "Authenticated users can read replies" on public.forum_replies
  for select using (auth.role() = 'authenticated');

create policy "Users can create replies" on public.forum_replies
  for insert with check (auth.uid() = user_id);

create policy "Users can update own replies" on public.forum_replies
  for update using (auth.uid() = user_id);

create policy "Admins full access to forum replies" on public.forum_replies
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- ACHIEVEMENTS
-- ============================================
create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_name text not null,
  order_index int not null default 0
);

alter table public.achievements enable row level security;

create policy "Authenticated users can read achievements" on public.achievements
  for select using (auth.role() = 'authenticated');

create policy "Admins full access to achievements" on public.achievements
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Seed achievements
insert into public.achievements (slug, name, description, icon_name, order_index) values
  ('basecamp', 'Basecamp', 'Complete the first Trailhead milestone', 'tent', 1),
  ('arrow-lakes', 'Arrow Lakes', 'Set up your Google Business profile', 'waves', 2),
  ('old-growth', 'Old Growth', 'Complete 5 guides', 'tree-pine', 3),
  ('pulpit-rock', 'Pulpit Rock', 'Get your first Google review', 'mountain', 4),
  ('osprey', 'Osprey', 'Achieve a site score above 80', 'bird', 5),
  ('summit', 'Summit', 'Complete the entire Trailhead', 'flag-triangle-right', 6),
  ('trailblazer', 'Trailblazer', 'Make your first community post', 'flame', 7),
  ('northern-light', 'Northern Light', 'Help 3 others in the community', 'sparkles', 8),
  ('kootenay-legend', 'Kootenay Legend', 'Earn all badges', 'crown', 9);

-- ============================================
-- USER ACHIEVEMENTS
-- ============================================
create table public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  achievement_id uuid references public.achievements on delete cascade not null,
  earned_at timestamptz not null default now(),
  unique(user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

create policy "Users can view own achievements" on public.user_achievements
  for select using (auth.uid() = user_id);

-- Community can see each other's achievements
create policy "Community can view achievements" on public.user_achievements
  for select using (auth.role() = 'authenticated');

create policy "Admins full access to user achievements" on public.user_achievements
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.guides
  for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.tickets
  for each row execute procedure public.handle_updated_at();
create trigger set_updated_at before update on public.forum_posts
  for each row execute procedure public.handle_updated_at();

-- ============================================
-- INDEXES
-- ============================================
create index idx_guides_slug on public.guides(slug);
create index idx_guides_category on public.guides(category);
create index idx_guides_published on public.guides(published);
create index idx_user_guide_progress_user on public.user_guide_progress(user_id);
create index idx_tickets_user on public.tickets(user_id);
create index idx_tickets_status on public.tickets(status);
create index idx_forum_posts_category on public.forum_posts(category);
create index idx_forum_replies_post on public.forum_replies(post_id);
create index idx_user_achievements_user on public.user_achievements(user_id);
