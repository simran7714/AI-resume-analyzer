-- ==========================================
-- SUPABASE POSTGRESQL DATABASE SCHEMA
-- FOR AI RESUME SCREENING & ANALYZER SYSTEM
-- ==========================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- 1. HELPERS & ROLE CHECKS
-- ------------------------------------------

-- Helper function to extract user role from metadata stored in auth.users
CREATE OR REPLACE FUNCTION auth.get_user_role()
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'user_metadata' ->> 'role')::text,
    'candidate'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------
-- 2. TABLES CREATION
-- ------------------------------------------

-- Jobs Table
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    salary TEXT,
    min_experience INTEGER DEFAULT 0,
    min_education TEXT,
    required_skills TEXT[] DEFAULT '{}'::TEXT[],
    preferred_skills TEXT[] DEFAULT '{}'::TEXT[],
    required_certifications TEXT[] DEFAULT '{}'::TEXT[],
    description TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Candidates Table
CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    linkedin TEXT,
    github TEXT,
    portfolio TEXT,
    experience_years INTEGER DEFAULT 0,
    education TEXT,
    skills TEXT[] DEFAULT '{}'::TEXT[],
    certifications TEXT[] DEFAULT '{}'::TEXT[],
    raw_text TEXT,
    scores JSONB NOT NULL,
    recommendation JSONB NOT NULL,
    voice_summary_text TEXT,
    fraud_warning TEXT,
    duplicate_detected BOOLEAN DEFAULT false,
    recruiter_notes JSONB DEFAULT '[]'::JSONB,
    status TEXT DEFAULT 'Manual Review', -- 'Approved' | 'Manual Review' | 'Rejected'
    interview_scheduled JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Audit Logs Table
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    "user" TEXT DEFAULT 'Recruiter',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------
-- 3. INDEXES FOR PERFORMANCE
-- ------------------------------------------
CREATE INDEX idx_candidates_job_id ON public.candidates(job_id);
CREATE INDEX idx_candidates_email ON public.candidates(email);
CREATE INDEX idx_candidates_status ON public.candidates(status);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);

-- ------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- --- JOBS POLICIES ---

-- Recruiters and Admins have full access to Jobs
CREATE POLICY "Recruiters and admins have full control over jobs" ON public.jobs
    FOR ALL
    TO authenticated
    USING (auth.get_user_role() IN ('recruiter', 'admin'))
    WITH CHECK (auth.get_user_role() IN ('recruiter', 'admin'));

-- Anyone (including anonymous/candidates) can view active jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
    FOR SELECT
    TO public
    USING (status = 'Active');


-- --- CANDIDATES POLICIES ---

-- Recruiters and Admins can view and manage all candidate profiles
CREATE POLICY "Recruiters and admins have full control over candidates" ON public.candidates
    FOR ALL
    TO authenticated
    USING (auth.get_user_role() IN ('recruiter', 'admin'))
    WITH CHECK (auth.get_user_role() IN ('recruiter', 'admin'));

-- Candidates can submit their applications (INSERT)
CREATE POLICY "Anyone can apply (insert candidate)" ON public.candidates
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Candidates can view their own application details by matching email
CREATE POLICY "Candidates can view their own applications" ON public.candidates
    FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'email' = email);


-- --- AUDIT LOGS POLICIES ---

-- Only recruiters and admins can see audit logs
CREATE POLICY "Recruiters and admins can view audit logs" ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (auth.get_user_role() IN ('recruiter', 'admin'));

-- Backend server or client actions can append logs (INSERT)
CREATE POLICY "System and authenticated users can insert audit logs" ON public.audit_logs
    FOR INSERT
    TO public
    WITH CHECK (true);


-- ------------------------------------------
-- 5. STORAGE BUCKET CREATION & RLS
-- ------------------------------------------

-- Create the Storage Bucket for Resumes (Insert into storage.buckets table)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage Policies for 'resumes' Bucket:

-- Policy: Allow anyone (applicants) to upload resumes to the storage bucket
CREATE POLICY "Allow public uploads of resumes" ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'resumes');

-- Policy: Allow recruiters and admins to download/view all resumes
CREATE POLICY "Allow recruiters/admins to view resumes" ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes' AND auth.get_user_role() IN ('recruiter', 'admin'));

-- Policy: Allow candidates to view/download their own uploaded resumes
CREATE POLICY "Allow candidates to view own resume file" ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'resumes' AND (owner = auth.uid()::text OR owner_id::text = auth.uid()::text));

-- Policy: Allow recruiters and admins to delete/update resumes
CREATE POLICY "Allow recruiters/admins to delete resumes" ON storage.objects
    FOR ALL
    TO authenticated
    USING (bucket_id = 'resumes' AND auth.get_user_role() IN ('recruiter', 'admin'))
    WITH CHECK (bucket_id = 'resumes' AND auth.get_user_role() IN ('recruiter', 'admin'));
