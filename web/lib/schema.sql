-- Banco de dados: Tarefas Domésticas (Supabase PostgreSQL)
-- Execute este SQL no Editor SQL do painel do Supabase.

-- 1. Tabela de membros da casa (compartilhada por toda a casa única)
create table if not exists public.members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Tabela de tarefas
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  period text not null check (period in ('week', 'weekend')),
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de atribuição N:N entre tarefas e membros
create table if not exists public.task_assignees (
  task_id uuid references public.tasks(id) on delete cascade,
  member_id uuid references public.members(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (task_id, member_id)
);

-- Índices úteis
create index if not exists tasks_period_idx on public.tasks(period);
create index if not exists tasks_completed_idx on public.tasks(is_completed);
create index if not exists task_assignees_member_idx on public.task_assignees(member_id);
create index if not exists task_assignees_task_idx on public.task_assignees(task_id);

-- Habilitar RLS em todas as tabelas
alter table public.members enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignees enable row level security;

-- Políticas: usuário autenticado pode ler tudo da casa única
create policy "Members are viewable by authenticated users"
  on public.members for select
  to authenticated
  using (true);

create policy "Members are manageable by authenticated users"
  on public.members for all
  to authenticated
  using (true)
  with check (true);

create policy "Tasks are viewable by authenticated users"
  on public.tasks for select
  to authenticated
  using (true);

create policy "Tasks are manageable by authenticated users"
  on public.tasks for all
  to authenticated
  using (true)
  with check (true);

create policy "Task assignees are viewable by authenticated users"
  on public.task_assignees for select
  to authenticated
  using (true);

create policy "Task assignees are manageable by authenticated users"
  on public.task_assignees for all
  to authenticated
  using (true)
  with check (true);
