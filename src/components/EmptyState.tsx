import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "Không tìm thấy kết quả",
  message = "Không tìm thấy trường đại học nào phù hợp với tiêu chí tìm kiếm của bạn.",
}: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-[37px] px-4">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
      <div className="mt-6 space-y-4">
        <p className="text-sm text-gray-500">Bạn có thể thử:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            • Kiểm tra lại bộ lọc tìm kiếm
          </li>
          <li className="flex items-center gap-2">• Thử với từ khóa khác</li>
          <li className="flex items-center gap-2">
            • Mở rộng phạm vi tìm kiếm
          </li>
        </ul>
      </div>
    </div>
  );
}
