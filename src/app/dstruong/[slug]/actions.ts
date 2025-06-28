'use server';

import { supabase } from '@/lib/supabase';

interface School {
  id: number;
  slug: string;
  school_name: string;
  school_type: string;
  school_address: string;
  school_describe: string;
  school_year: string;
  school_admission_criteria: string;
  school_tuition: string;
  logo: string;
  details: string;
  created_at?: string;
  updated_at?: string;
}

export async function getBlogBySlug(slug: string): Promise<School | null> {
  try {
    const { data, error } = await supabase
      .from('truong-dai-hoc')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching school by slug:', error.message);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error in getBlogBySlug:', error);
    return null;
  }
}

export async function fetchAllSlugsFromDB(): Promise<{ slug: string }[]> {
  try {
    const { data, error } = await supabase
      .from('truong-dai-hoc')
      .select('slug');
    
    if (error) {
      console.error('Error fetching slugs:', error.message);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error in fetchAllSlugsFromDB:', error);
    return [];
  }
}
