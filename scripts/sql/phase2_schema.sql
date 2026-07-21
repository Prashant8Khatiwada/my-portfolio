-- Phase 2: Database schema for CMS + analytics
-- Run this once in Supabase SQL Editor.

-- CMS content tables
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tags text[],
  live_url text,
  github_url text,
  image_url text,
  featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  avatar_url text,
  content text not null,
  rating int default 5,
  display_order int default 0,
  active boolean default true
);

create table timeline (
  id uuid primary key default gen_random_uuid(),
  year text,
  title text not null,
  company text,
  description text,
  type text check (type in ('work','education')),
  display_order int default 0
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  proficiency int default 80,
  description text,
  display_order int default 0
);

create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  display_order int default 0
);

-- Analytics tables
create table page_views (
  id bigserial primary key,
  path text not null,
  referrer text,
  user_agent text,
  country text,
  session_id text,
  created_at timestamptz default now()
);

create table visitors (
  id bigserial primary key,
  session_id text unique not null,
  device text,
  os text,
  browser text,
  first_seen timestamptz default now(),
  last_seen timestamptz default now(),
  view_count int default 1
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  read boolean default false,
  created_at timestamptz default now()
);

-- Row-level security
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table timeline enable row level security;
alter table skills enable row level security;
alter table services enable row level security;
alter table page_views enable row level security;
alter table visitors enable row level security;
alter table messages enable row level security;

-- Public can read content
create policy "public read projects" on projects for select using (true);
create policy "public read testimonials" on testimonials for select using (active = true);
create policy "public read timeline" on timeline for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read services" on services for select using (true);

-- Anyone can insert analytics (anon key is fine here)
create policy "insert page_views" on page_views for insert with check (true);
create policy "insert visitors" on visitors for insert with check (true);
create policy "upsert visitors" on visitors for update using (true);
create policy "insert messages" on messages for insert with check (true);

-- Only authenticated users (admin) can write content and read messages
create policy "auth write projects" on projects for all using (auth.role() = 'authenticated');
create policy "auth write testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "auth write timeline" on timeline for all using (auth.role() = 'authenticated');
create policy "auth write skills" on skills for all using (auth.role() = 'authenticated');
create policy "auth write services" on services for all using (auth.role() = 'authenticated');
create policy "auth read messages" on messages for select using (auth.role() = 'authenticated');
create policy "auth read all page_views" on page_views for select using (auth.role() = 'authenticated');
create policy "auth read visitors" on visitors for select using (auth.role() = 'authenticated');
