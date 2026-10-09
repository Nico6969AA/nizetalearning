-- Nizeta: perfiles de usuario, elementos personalizados y limitación de intentos

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,20}$'),
  username_normalized text not null unique check (username_normalized ~ '^[a-z0-9_]{3,20}$'),
  provider text not null default 'password',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.custom_elements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  z integer not null check (z >= 119 and z <= 1000),
  simbolo text not null check (simbolo ~ '^[A-Za-z]{1,3}$'),
  nombre text not null check (char_length(btrim(nombre)) between 1 and 60),
  categoria text not null check (categoria in ('alcalino','alcalinoterreo','transicion','otro','nometal','halogeno','noble','lantanido','actinido')),
  masa numeric,
  fusion_c numeric,
  ebullicion_c numeric,
  oxidacion text check (char_length(oxidacion) <= 40),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, z)
);

create table public.login_attempts (
  id bigint generated always as identity primary key,
  username_normalized text not null,
  ip text,
  ok boolean not null,
  at timestamptz not null default now()
);

create index login_attempts_lookup on public.login_attempts (username_normalized, at desc);

-- Grants (Data API no concede privilegios por defecto)
grant select on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select, insert, update, delete on public.custom_elements to authenticated;
grant all on public.custom_elements to service_role;
grant all on public.login_attempts to service_role;

alter table public.profiles enable row level security;
alter table public.custom_elements enable row level security;
alter table public.login_attempts enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select to authenticated
  using (id = auth.uid());

create policy "Cada usuario gestiona sus propios elementos"
  on public.custom_elements for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Perfil automático al crear cualquier usuario (registro o Google)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base text;
  candidato text;
  n integer := 0;
begin
  base := regexp_replace(
    coalesce(
      new.raw_user_meta_data->>'name',
      split_part(coalesce(new.email, ''), '@', 1),
      'usuario'
    ),
    '[^A-Za-z0-9_]', '', 'g'
  );
  if char_length(base) < 3 then
    base := 'usuario' || substr(replace(new.id::text, '-', ''), 1, 6);
  elsif char_length(base) > 20 then
    base := substr(base, 1, 20);
  end if;

  candidato := base;
  loop
    exit when not exists (
      select 1 from public.profiles where username_normalized = lower(candidato)
    ) or n > 100;
    n := n + 1;
    candidato := base || n::text;
  end loop;

  insert into public.profiles (id, username, username_normalized, provider)
  values (new.id, candidato, lower(candidato), 'google')
  on conflict (id) do nothing;
  return new;
exception
  when others then
    return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
