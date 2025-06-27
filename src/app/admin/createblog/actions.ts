'use server';

import { supabase } from '@/lib/supabase';

interface Blog {
  logo: string;
  slug: string;
  school_name: string;
  school_address: string;
  school_year: string;
  school_type: string;
  school_describe: string;
  school_major_popular: string[];
  school_admission_criteria: string;
  school_tuition: string;
  details: string;
}

export async function saveBlog({ logo, slug, school_name, school_address, school_year, school_type, school_describe, school_major_popular, details, school_admission_criteria, school_tuition }: Blog) {
  const { data, error } = await supabase
    .from('truong-dai-hoc')
    .insert([
      {
        logo,
        slug,
        school_name,
        school_address,
        school_year,
        school_type,
        school_describe,
        school_major_popular,
        details,
        school_admission_criteria,
        school_tuition,
        created_at: new Date().toISOString(),
      },
    ]);
  if (error) throw error;
  return data;
}
