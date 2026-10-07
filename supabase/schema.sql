-- Replace OWNER_AUTH_USER_UUID with the UUID of your single editor account.
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text not null default '' check (char_length(excerpt) <= 300),
  cover_image_url text,
  tags text[] not null default '{}',
  content_md text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status = 'draft' or published_at is not null)
);

create index if not exists posts_published_at_idx
  on public.posts (published_at desc)
  where status = 'published';

alter table public.posts enable row level security;

grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

create policy "Public can read published posts and owner can read all"
  on public.posts
  for select
  using (
    status = 'published'
    or (
      auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid
      and author_id = auth.uid()
    )
  );

create policy "Only owner can create posts"
  on public.posts
  for insert
  with check (
    auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid
    and author_id = auth.uid()
  );

create policy "Only owner can update posts"
  on public.posts 
  for update
  using (
    auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid
    and author_id = auth.uid()
  )
  with check (
    auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid
    and author_id = auth.uid()
  );

create policy "Only owner can delete posts"
  on public.posts
  for delete
  using (
    auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid
    and author_id = auth.uid()
  );
