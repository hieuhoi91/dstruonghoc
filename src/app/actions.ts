'use server';

import { createClient } from '@/lib/supabase/server';

export async function getAllSchools() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('truong-dai-hoc')
    .select('*');
  if (error) throw error;
  return data;
}
