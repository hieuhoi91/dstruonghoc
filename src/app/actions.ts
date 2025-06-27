'use server';

import { supabase } from '@/lib/supabase';

export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('truong-dai-hoc')
    .select('*');
  if (error) throw error;
  return data;
}
