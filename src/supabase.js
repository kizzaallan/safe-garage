import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://briwlkqhxlqmedsjmsnd.supabase.co'

const supabaseKey = 'sb_publishable_5bCMP-YT-CvuA1q-e0cG7w_51ozk3Ka'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)