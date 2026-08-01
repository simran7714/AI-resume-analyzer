-- =====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR AI RESUME ANALYZER
-- =====================================================================
-- Contains:
-- 1. Custom extensions & utility functions
-- 2. Tables for Profiles, Jobs, Candidates, Recruiter Notes, Interviews, & Audit Logs
-- 3. Automatic profiles sync trigger linked with auth.users
-- 4. Row-Level Security (RLS) policies & role-based helpers
-- 5. Performance Indexes
-- =====================================================================

-- Enable necessary Extensions
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. ROLE HELPER FUNCTIONS
-- ==========================================

-- Helper to check if the current user is a recruiter or admin
create or replace function public.is_recruiter()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('recruiter', 'admin')
  );
end;
$$ language plpgsql security definer;

-- ==========================================
-- 2. SCHEMAS & TABLES
-- ==========================================

-- A. PROFILES TABLE (Linked with Supabase Auth users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  name text,
  role text not null check (role in ('recruiter', 'candidate', 'admin')) default 'candidate',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- B. JOB ROLES TABLE
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  type text not null, -- e.g., Full-time, Hybrid, Remote, Contract
  salary text,
  min_experience integer not null default 0,
  min_education text not null,
  required_skills text[] not null default '{}',
  preferred_skills text[] not null default '{}',
  required_certifications text[] not null default '{}',
  description text,
  status text not null check (status in ('Active', 'Closed')) default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- C. CANDIDATES TABLE
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null, -- Optional linkage to registered user
  job_title text not null,
  name text not null,
  email text not null,
  phone text,
  location text,
  linkedin text,
  github text,
  portfolio text,
  experience_years numeric not null default 0,
  education text,
  skills text[] not null default '{}',
  certifications text[] not null default '{}',
  raw_text text,
  scores jsonb not null default '{}'::jsonb,
  recommendation jsonb not null default '{}'::jsonb,
  voice_summary_text text,
  fraud_warning text,
  duplicate_detected boolean not null default false,
  status text not null check (status in ('Approved', 'Manual Review', 'Rejected', 'New')) default 'New',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- D. RECRUITER NOTES TABLE
create table if not exists public.recruiter_notes (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  author_name text not null,
  author_id uuid references public.profiles(id) on delete set null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- E. INTERVIEW SCHEDULES TABLE
create table if not exists public.interview_schedules (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid references public.candidates(id) on delete cascade not null unique,
  date date not null,
  time time not null,
  meet_url text,
  status text not null check (status in ('Scheduled', 'Completed', 'Cancelled')) default 'Scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- F. AUDIT LOGS TABLE
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  user_name text not null,
  user_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 3. PROFILES AUTOMATION (TRIGGERS)
-- ==========================================

-- Trigger to automatically create a public profile entry when a user registers on Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', 'Anonymous Candidate'),
    coalesce(new.raw_user_meta_data->>'role', 'candidate'),
    coalesce(
      new.raw_user_meta_data->>'avatar_url', 
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    )
  );
  return new;
end;
$$ language plpgsql security definer;

-- Attach the trigger to auth.users table
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update timestamps function
create or replace function public.update_modified_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach auto-update triggers
create or replace trigger update_profiles_modtime before update on public.profiles for each row execute procedure public.update_modified_column();
create or replace trigger update_jobs_modtime before update on public.jobs for each row execute procedure public.update_modified_column();
create or replace trigger update_candidates_modtime before update on public.candidates for each row execute procedure public.update_modified_column();
create or replace trigger update_interview_schedules_modtime before update on public.interview_schedules for each row execute procedure public.update_modified_column();

-- ==========================================
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS across all tables
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.candidates enable row level security;
alter table public.recruiter_notes enable row level security;
alter table public.interview_schedules enable row level security;
alter table public.audit_logs enable row level security;

-- A. PROFILES POLICIES
create policy "Allow profile read for owner or recruiter" on public.profiles
  for select using (auth.uid() = id or public.is_recruiter());

create policy "Allow profile updates for owners only" on public.profiles
  for update using (auth.uid() = id);

-- B. JOBS POLICIES
create policy "Allow active job reads for anyone" on public.jobs
  for select using (status = 'Active' or public.is_recruiter());

create policy "Allow full job management for recruiters only" on public.jobs
  for all using (public.is_recruiter());

-- C. CANDIDATES POLICIES
create policy "Allow recruiters full access to candidates" on public.candidates
  for all using (public.is_recruiter());

create policy "Allow candidate owner to read own application" on public.candidates
  for select using (auth.uid() = user_id or email = (select email from public.profiles where id = auth.uid()));

create policy "Allow candidate owner to submit own application" on public.candidates
  for insert with check (auth.uid() = user_id or auth.uid() is not null);

-- D. RECRUITER NOTES POLICIES
create policy "Allow note access for recruiters only" on public.recruiter_notes
  for all using (public.is_recruiter());

-- E. INTERVIEW SCHEDULES POLICIES
create policy "Allow recruiter full access to interviews" on public.interview_schedules
  for all using (public.is_recruiter());

create policy "Allow candidate to view own interview" on public.interview_schedules
  for select using (
    exists (
      select 1 from public.candidates c
      where c.id = candidate_id and (c.user_id = auth.uid() or c.email = (select email from public.profiles where id = auth.uid()))
    )
  );

-- F. AUDIT LOGS POLICIES
create policy "Allow audit log access for recruiters only" on public.audit_logs
  for select using (public.is_recruiter());

create policy "Allow audit log creation for logged in users" on public.audit_logs
  for insert with check (auth.uid() is not null);

-- ==========================================
-- 5. PERFORMANCE INDEXES
-- ==========================================

create index if not exists idx_candidates_job_id on public.candidates(job_id);
create index if not exists idx_candidates_user_id on public.candidates(user_id);
create index if not exists idx_candidates_email on public.candidates(email);
create index if not exists idx_candidates_status on public.candidates(status);
create index if not exists idx_recruiter_notes_candidate_id on public.recruiter_notes(candidate_id);
create index if not exists idx_interview_schedules_candidate_id on public.interview_schedules(candidate_id);
create index if not exists idx_jobs_status on public.jobs(status);
