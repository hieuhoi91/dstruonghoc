import SchoolCard from "@/pages/home/SchoolCard";
import SearchHeader from "@/pages/home/Search";
import { getAllSchools } from "./actions";

export default async function HomePage() {
  let schools: any[] = [];
  let error = null;

  try {
    schools = await getAllSchools();
  } catch (e) {
    error = e;
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      <h1 className="text-3xl font-bold text-center mt-10 mb-4">
        Khám phá các trường đại học nổi bật
      </h1>
      <div className="py-10 px-4 flex flex-col gap-4">
        <SearchHeader />
        {error ? (
          <div className="text-red-500">Lỗi tải dữ liệu trường học.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools && schools.length > 0 ? (
              schools.map((school: any) => (
                <SchoolCard
                  key={school.id}
                  school={{
                    logo: school.logo,
                    name: school.school_name,
                    describe: school.school_describe,
                    type: school.school_type,
                    majors: school.school_major_popular || [],
                    address: school.school_address,
                    slug: school.slug,
                  }}
                />
              ))
            ) : (
              <div>Không có trường nào.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
