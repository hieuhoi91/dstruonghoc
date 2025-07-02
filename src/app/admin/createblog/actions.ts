'use server';

import { createClient } from '@/lib/supabase/server';

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
  school_website: string;
  school_admission_point: string;
  school_short_name: string;
  school_dormitory: string;
  details: string;
}

export async function saveBlog({ logo, slug, school_name, school_address, school_year, school_type, school_describe, school_major_popular, details, school_admission_criteria, school_tuition, school_website, school_admission_point, school_short_name, school_dormitory }: Blog) {
  const supabase = createClient();
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
        school_website,
        school_admission_point,
        school_short_name,
        school_dormitory,
        created_at: new Date().toISOString(),
      },
    ]);
  if (error) throw error;
  return data;
}
