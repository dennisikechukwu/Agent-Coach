-- Create profiles table
create table if not exists public.profiles (
  wallet_address text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  total_staked numeric default 0.0 not null,
  total_earned numeric default 0.0 not null
);

-- Create goals table
create type public.goal_status as enum ('active', 'completed', 'failed');

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  wallet_address text references public.profiles(wallet_address) on delete cascade not null,
  title text not null,
  stake_amount numeric not null,
  duration_days int not null,
  status goal_status default 'active'::goal_status not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create check_ins table
create type public.ai_status as enum ('pending', 'approved', 'rejected');

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid references public.goals(id) on delete cascade not null,
  image_url text not null,
  ai_status ai_status default 'pending'::ai_status not null,
  ai_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table for persistent chat
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  wallet_address text references public.profiles(wallet_address) on delete cascade not null,
  content text not null,
  is_user boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- NOTE ON ROW LEVEL SECURITY (RLS) FOR HACKATHONS:
-- Since we proxy all DB calls through Next.js API Routes using the Service Role Key,
-- RLS is bypassed server-side. But to be safe for the hackathon demo, 
-- explicitly disable RLS on all tables:

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow the service role to do everything (this is the default, but explicit is better)
CREATE POLICY "Service role full access on profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on goals" ON public.goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on check_ins" ON public.check_ins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
