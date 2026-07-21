-- Phase 11: Profile & Landing Page settings table
-- Run this in your Supabase SQL Editor.

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  description text,
  availability_status text,
  github_url text,
  linkedin_url text,
  email text,
  about_title text,
  about_subtitle text,
  about_description_1 text,
  about_description_2 text,
  stats_experience text,
  stats_projects text,
  stats_clients text,
  stats_technologies text,
  created_at timestamptz default now()
);

-- Public can read profile
alter table public.profile enable row level security;
create policy "public read profile" on public.profile for select using (true);
create policy "admin update profile" on public.profile for all using (auth.role() = 'authenticated');

-- Insert default details
insert into public.profile (
  name,
  title,
  description,
  availability_status,
  github_url,
  linkedin_url,
  email,
  about_title,
  about_subtitle,
  about_description_1,
  about_description_2,
  stats_experience,
  stats_projects,
  stats_clients,
  stats_technologies
) values (
  'Prashant Khatiwada',
  'Frontend Developer',
  'I have a strong curiosity and creative mindset that drives me to find innovative solutions. Passionate React developer skilled at creating polished and effective web solutions.',
  'Available for freelance work',
  'https://github.com/Prashant8Khatiwada',
  'https://www.linkedin.com/in/prashant-khatiwada-a0b99a184/',
  'prashantkhatiwada21@gmail.com',
  'About Me',
  'Get To Know Me',
  'I have a strong curiosity and creative mindset that drives me to find innovative solutions and question the way things are done. Passionate React developer skilled at creating polished and effective web solutions.',
  'I am deeply committed to keeping up with the latest advancements in the ever-changing React ecosystem and continuously improving my skills.',
  '3',
  '10',
  '20',
  '10'
);
