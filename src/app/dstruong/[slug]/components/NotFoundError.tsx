import Link from "next/link";

export default function NotFoundError() {
  return (
    <div className="h-[70vh] bg-[#f7faff] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-2">
          Không tìm thấy trường
        </h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, chúng tôi không thể tìm thấy thông tin về trường bạn đang tìm
          kiếm.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
