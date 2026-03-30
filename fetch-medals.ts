import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('No keys found in process.env');
  console.log('URL:', supabaseUrl);
  console.log('KEY:', supabaseKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetch() {
  const {data, error} = await supabase.from('freelancer_medals').select('slug, name, description').order('order_index');
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

fetch();
