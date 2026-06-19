import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://trkcpiiahabdyyemjyjw.supabase.co'
const supabaseKey = 'sb_publishable_V-6cbT5SuKjKAww9d9R10Q_rb-g4LQl'

export const supabase = createClient(supabaseUrl, supabaseKey)