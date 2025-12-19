// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Замініть на ваші реальні дані з Supabase Dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tfdkfzwdwtlfjaszlkem.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZGtmendkd3RsZmphc3psa2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjM4MjcsImV4cCI6MjA4MTYzOTgyN30.i4VaM091KODMoE0mLaWYMllHhLvUHHZaYI04VrL4bHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);