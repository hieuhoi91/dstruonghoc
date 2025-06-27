'use server';

import { supabase } from '@/lib/supabase';

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('truong-dai-hoc')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}
