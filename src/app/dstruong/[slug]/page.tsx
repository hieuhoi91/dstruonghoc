"use client";

import { Badge } from "@/components/ui/badge";
import { use, useEffect, useState } from "react";
import { getBlogBySlug } from "./actions";
import Tiptap from "./components/Tiptap";

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

const DetailSchoolPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getBlogBySlug(slug);
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="detail-school-page bg-[#f7faff] min-h-screen flex items-center justify-center">
        <div className="text-lg">Đợi xíu nha bạn</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-school-page bg-[#f7faff] min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Ko có trường này</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="detail-school-page bg-[#f7faff] min-h-screen flex items-center justify-center">
        <div className="text-lg">Ko có trường này</div>
      </div>
    );
  }

  return (
    <div className="detail-school-page bg-[#f7faff] min-h-screen">
      {/* Header Section */}
      <div className="header flex flex-col items-center py-12 bg-gradient-to-b from-[#f7faff] to-white">
        <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border">
          <img
            src={data.logo}
            alt={data.school_name}
            className="w-20 h-20 object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold my-3">{data.school_name}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {data.school_type && (
              <Badge color="bg-green-100 text-green-700 border border-green-200">
                {data.school_type}
              </Badge>
            )}
            {data.school_address && (
              <Badge color="bg-green-100 text-green-700 border border-green-200">
                {data.school_address}
              </Badge>
            )}
          </div>
          <div className="text-gray-500 text-center max-w-3xl mt-4">
            {data.school_describe}
          </div>
        </div>
        {/* <div className="info flex flex-wrap justify-center gap-4 text-gray-500 text-sm max-w-2xl mt-4">
          {data.school_major_popular.map((major) => (
            <span
              key={major}
              className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs"
            >
              {major}
            </span>
          ))}
        </div> */}
      </div>

      {/* Job Overview Section */}
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
      <div className="mt-8">
        <Tiptap content={data.details} />
      </div>
    </div>
  );
};

export default DetailSchoolPage;
