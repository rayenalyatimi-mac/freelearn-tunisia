-- 1. PROFILES: one row per student, created automatically at sign-up
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null unique
    check (nickname ~ '^[A-Za-z0-9_-]{3,20}$'),
  show_on_leaderboard boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. COMPLETIONS: self-declared completions with an optional evidence link
create table public.completions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null check (length(course_id) <= 100),
  completed_at date not null default current_date,
  certificate_url text
    check (certificate_url is null or certificate_url ~* '^https?://'),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- 3. COURSE SUGGESTIONS: reviewed by hand before anything is published
create table public.course_suggestions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (length(title) between 3 and 200),
  platform text not null check (length(platform) between 2 and 100),
  url text not null check (url ~* '^https?://' and length(url) <= 500),
  course_is_free boolean not null,
  certificate_cost text not null
    check (certificate_cost in ('free', 'paid', 'none', 'unknown')),
  notes text check (notes is null or length(notes) <= 1000),
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now()
);

-- 4. USER BADGES: special badges awarded by the site owner only
create table public.user_badges (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null check (length(badge_id) <= 50),
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

-- Row Level Security: locked unless a policy allows access
alter table public.profiles enable row level security;
alter table public.completions enable row level security;
alter table public.course_suggestions enable row level security;
alter table public.user_badges enable row level security;

-- Explicit grants (new tables are not exposed automatically).
-- Nothing is granted to the anonymous role: visitors who are not logged in get no access.
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.completions to authenticated;
grant select, insert on public.course_suggestions to authenticated;
grant select on public.user_badges to authenticated;

--