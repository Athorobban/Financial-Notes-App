-- ===========================
-- 1️⃣ Table user_roles
-- ===========================
create extension if not exists "uuid-ossp";

create table if not exists public.user_roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null check (name in ('Admin', 'User')) 
);

insert into public.user_roles (name)
values ('Admin'), ('User') 
on conflict (name) do nothing;

-- ===========================
-- 2️⃣ Table profiles (extended)
-- ===========================
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade, 
  name text,
  role text references public.user_roles(name),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

alter table public.profiles enable row level security; 

-- ===========================
-- 3️⃣ Function: handle_new_user
-- ===========================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    coalesce(new.raw_user_meta_data ->> 'role', 'User') 
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===========================
-- 4️⃣ Function: handle_delete_user
-- ===========================
create or replace function public.handle_delete_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute procedure public.handle_delete_user();

-- ===========================
-- 5️⃣ View: user_with_roles (opsional)
-- ===========================
create or replace view public.user_with_roles as
select
  p.id as user_id,
  p.name,
  p.role,
  r.id as role_id,
  r.name as role_name,
  p.created_at
from public.profiles p
left join public.user_roles r on p.role = r.name;

-- ===========================
-- 6️⃣ Policies: RLS (Row Level Security)
-- ===========================
create policy "Allow individual read access on profiles"
on public.profiles
for select
using (auth.uid() = id);

create policy "Allow individual update on profiles"
on public.profiles
for update
using (auth.uid() = id);

create policy "Admin full access on profiles"
on public.profiles
for all
using (exists (
  select 1 from public.profiles as p2
  where p2.id = auth.uid() and p2.role = 'Admin'
));