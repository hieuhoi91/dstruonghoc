// app/blog/[slug]/page.tsx
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import Image from "next/image";
import { fetchAllSlugsFromDB, getBlogBySlug } from "./actions";
import TiptapClientWrapper from "./components/TiptapClientWrapper";

export async function generateStaticParams() {
  const blogs: { slug: string }[] = await fetchAllSlugsFromDB();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function DetailSchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data) {
    return <div>404 - Không tìm thấy bài viết</div>;
  }

  // SEO structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: data.school_name,
    address: data.school_address,
    description: data.school_describe,
    image: data.logo,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dstruong/${data.slug}`,
  };

  return (
    <>
      <Head>
        <title>{data.school_name} - Thông tin chi tiết trường đại học</title>
        <meta name="description" content={data.school_describe} />
        <meta property="og:title" content={data.school_name} />
        <meta property="og:description" content={data.school_describe} />
        <meta property="og:image" content={data.logo} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/dstruong/${data.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.school_name} />
        <meta name="twitter:description" content={data.school_describe} />
        <meta name="twitter:image" content={data.logo} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Head>
      <div className="detail-school-page bg-[#f7faff] min-h-screen">
        {/* Header Section */}
        <div className="header flex flex-col items-center py-12 bg-gradient-to-b from-[#f7faff] to-white">
          <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border">
            <Image
              src={data.logo}
              alt={data.school_name}
              width={80}
              height={80}
              className="object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold my-3">{data.school_name}</h1>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge>{data.school_type}</Badge>
              <Badge>{data.school_address}</Badge>
            </div>
            <div className="text-gray-500 text-center max-w-3xl mt-4">
              {data.school_describe}
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="job-overview max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-blue-700">
            <div>
              <div className="font-medium">Loại trường</div>
              <div className="text-gray-500">{data.school_type}</div>
            </div>
            <div>
              <div className="font-medium">Địa chỉ</div>
              <div className="text-gray-500">{data.school_address}</div>
            </div>
            <div>
              <div className="font-medium">Năm thành lập</div>
              <div className="text-gray-500">{data.school_year}</div>
            </div>
            <div>
              <div className="font-medium">Chỉ tiêu tuyển sinh</div>
              <div className="text-gray-500">
                {data.school_admission_criteria}
              </div>
            </div>
            <div>
              <div className="font-medium">Học phí</div>
              <div className="text-gray-500">{data.school_tuition}</div>
            </div>
          </div>
        </div>

        {/* Nội dung bài viết */}
        <div className="mt-8">
          <TiptapClientWrapper content={data.details} />
        </div>
      </div>
    </>
  );
}
