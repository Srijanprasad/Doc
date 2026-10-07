create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text not null default '' check (char_length(excerpt) <= 300),
  content text not null,
  image text,
  category text not null default '',
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_created_at_idx
  on public.posts (created_at desc)
  where published = true;

create or replace function public.set_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_post_updated_at();

alter table public.posts enable row level security;

grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

drop policy if exists "Public reads published posts" on public.posts;
create policy "Public reads published posts"
  on public.posts
  for select
  to anon, authenticated
  using (
    published = true
    or (
      lower(coalesce(auth.jwt() ->> 'email', '')) =
      lower('srijanprasad2006@gmail.com')
    )
  );

drop policy if exists "Owner inserts posts" on public.posts;
create policy "Owner inserts posts"
  on public.posts
  for insert
  to authenticated
  with check (
    lower(coalesce(auth.jwt() ->> 'email', '')) =
    lower('srijanprasad2006@gmail.com')
  );

drop policy if exists "Owner updates posts" on public.posts;
create policy "Owner updates posts"
  on public.posts
  for update
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) =
    lower('srijanprasad2006@gmail.com')
  )
  with check (
    lower(coalesce(auth.jwt() ->> 'email', '')) =
    lower('srijanprasad2006@gmail.com')
  );

drop policy if exists "Owner deletes posts" on public.posts;
create policy "Owner deletes posts"
  on public.posts
  for delete
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) =
    lower('srijanprasad2006@gmail.com')
  );

-- Do not authorize from user_metadata.user_name: users can edit user_metadata.
-- The owner-email check above is enforced by Supabase RLS for every mutation.
