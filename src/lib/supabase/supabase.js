// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dhifsbicymcknwkangro.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaWZzYmljeW1ja253a2FuZ3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MDQ4MTEsImV4cCI6MjAzOTM4MDgxMX0.LocgtFozkNyzdIkHYYHm9QRVF6-fP2pUn_kGWcHRPHA'
export const supabase = createClient(supabaseUrl, supabaseKey)