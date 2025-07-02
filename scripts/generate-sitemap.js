const fs = require("node:fs");
const { createClient } = require("@supabase/supabase-js");

const SITE_URL = "https://bespoke-gaufre-39a662.netlify.app";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

async function generateSitemap() {
  try {
    // Fetch all schools from Supabase
    const { data: schools, error } = await supabase
      .from("truong-dai-hoc")
      .select("slug, updated_at");

    if (error) throw error;

    // Create sitemap header
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Index Page -->
  <url>
    <loc>${SITE_URL}/dstruong</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  ${schools
    .map((school) => {
      const lastmod = school.updated_at
        ? new Date(school.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      return `
  <!-- School Page -->
  <url>
    <loc>${SITE_URL}/dstruong/${school.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("\n")}

</urlset>`;

    // Write sitemap to public directory
    fs.writeFileSync("public/sitemap.xml", sitemap);
    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
