import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://zgfmraltpybhmrlovpys.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZm1yYWx0cHliaG1ybG92cHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjk2ODQsImV4cCI6MjA3NTg0NTY4NH0.g497F9nkpY8z36y9CIB8IW7LBJ2f62uAvDOo8jtETkA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
