-- =====================================================================
-- Website editor (CMS) – run this ONCE in Supabase → SQL Editor.
-- Safe to re-run. Until it is run, the site keeps showing the built-in
-- default content, so nothing breaks.
-- =====================================================================

-- 1. Who may edit the website. Add your login email(s) here.
create table if not exists public.cms_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

-- >>> CHANGE THIS to the email you log in to /admin with <<<
insert into public.cms_admins (email) values ('you@example.com') on conflict do nothing;

create or replace function public.cms_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.cms_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- 2. Pages, header/footer groups and theme (draft + published copy of each)
create table if not exists public.cms_documents (
  slug text not null,
  status text not null check (status in ('draft', 'published')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (slug, status)
);

-- 3. Every publish is kept so you can roll back
create table if not exists public.cms_revisions (
  id bigint generated always as identity primary key,
  slug text not null,
  data jsonb not null,
  created_at timestamptz not null default now(),
  created_by text
);
create index if not exists cms_revisions_slug_idx on public.cms_revisions (slug, created_at desc);

-- 4. Submissions from newsletter / contact form sections
create table if not exists public.cms_submissions (
  id bigint generated always as identity primary key,
  form text not null,
  data jsonb not null,
  page text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------
alter table public.cms_admins enable row level security;
alter table public.cms_documents enable row level security;
alter table public.cms_revisions enable row level security;
alter table public.cms_submissions enable row level security;

drop policy if exists "cms_admins self read" on public.cms_admins;
create policy "cms_admins self read" on public.cms_admins
  for select using (public.cms_is_admin());

drop policy if exists "cms public reads published" on public.cms_documents;
create policy "cms public reads published" on public.cms_documents
  for select using (status = 'published' or public.cms_is_admin());

drop policy if exists "cms admins write" on public.cms_documents;
create policy "cms admins write" on public.cms_documents
  for all using (public.cms_is_admin()) with check (public.cms_is_admin());

drop policy if exists "cms admins revisions" on public.cms_revisions;
create policy "cms admins revisions" on public.cms_revisions
  for all using (public.cms_is_admin()) with check (public.cms_is_admin());

drop policy if exists "cms anyone submits" on public.cms_submissions;
create policy "cms anyone submits" on public.cms_submissions
  for insert with check (true);

drop policy if exists "cms admins read submissions" on public.cms_submissions;
create policy "cms admins read submissions" on public.cms_submissions
  for select using (public.cms_is_admin());

drop policy if exists "cms admins delete submissions" on public.cms_submissions;
create policy "cms admins delete submissions" on public.cms_submissions
  for delete using (public.cms_is_admin());

-- ---------------------------------------------------------------------
-- 5. Media library (public image/video bucket)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = true;

drop policy if exists "cms media public read" on storage.objects;
create policy "cms media public read" on storage.objects
  for select using (bucket_id = 'cms-media');

drop policy if exists "cms media admin insert" on storage.objects;
create policy "cms media admin insert" on storage.objects
  for insert with check (bucket_id = 'cms-media' and public.cms_is_admin());

drop policy if exists "cms media admin update" on storage.objects;
create policy "cms media admin update" on storage.objects
  for update using (bucket_id = 'cms-media' and public.cms_is_admin());

drop policy if exists "cms media admin delete" on storage.objects;
create policy "cms media admin delete" on storage.objects
  for delete using (bucket_id = 'cms-media' and public.cms_is_admin());
