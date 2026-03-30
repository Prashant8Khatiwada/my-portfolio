-- Phase 10: Patch skills table to include description.
-- Safe to run multiple times.

alter table if exists public.skills
add column if not exists description text;
