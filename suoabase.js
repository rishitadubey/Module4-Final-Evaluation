import {createClient} from
'@supabase/supabase-js'
import dotenv from 'dotenv'

export const supabase = createClient(
      ProcessingInstruction.env.SUPABASE_URL,
      ProcessingInstruction.env.SUPABASE_KEY
)