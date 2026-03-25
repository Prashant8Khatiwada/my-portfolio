-- Phase 7: Supabase Storage setup for project images
-- Creates public bucket `portfolio` and required RLS policies on storage.objects.

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = excluded.public;

-- Everyone can read portfolio files
drop policy if exists "portfolio public read" on storage.objects;
create policy "portfolio public read"
on storage.objects
for select
using (bucket_id = 'portfolio');

-- Authenticated users can upload portfolio files
drop policy if exists "portfolio auth upload" on storage.objects;
create policy "portfolio auth upload"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio');

-- Allow authenticated users to update/delete portfolio files
drop policy if exists "portfolio auth update" on storage.objects;
create policy "portfolio auth update"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio')
with check (bucket_id = 'portfolio');

drop policy if exists "portfolio auth delete" on storage.objects;
create policy "portfolio auth delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio');
