'use server';

import { createClient } from '@/lib/supabase/server';

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
  school_admission_point: string;
  school_website: string;
  school_dormitory: string;
  school_short_name: string;
  created_at?: string;
  updated_at?: string;
}

export async function getBlogBySlug(slug: string): Promise<School | null> {
    try {
    const supabase = createClient();
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

export async function fetchAllSlugsFromDB() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('truong-dai-hoc')
      .select('slug');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}
