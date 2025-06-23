import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Search } from "lucide-react";
import CategorySearch from "./CategorySearch";

const SearchHeader = () => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-2 gap-4 w-full mx-auto">
      {/* Dropdown danh mục nghề */}
      <CategorySearch />
      {/* Input tìm kiếm */}
      <div className="flex items-center gap-2 flex-2">
        <span className="material-icons text-base"><Search /></span>
        <input
        type="text"
        placeholder="Tìm kiếm trường đại học"
        className="px-1 flex-1 py-2 bg-transparent outline-none text-sm text-gray-700"
      />
      </div>
      {/* Địa điểm */}
      <div className="flex flex-1 items-center gap-2 bg-gray-100 rounded-full p-2 text-sm text-gray-700">
        <span className="material-icons text-xs text-primary"><MapPin /></span>
        <span className="text-sm flex-1 text-left">Hồ Chí Minh</span>
        {/* <button className="ml-1 focus:outline-none">
          <span className="material-icons text-xs text-gray-400"><X /></span>
        </button> */}
        <span className="material-icons text-xs ml-1"><ChevronDown /></span>
      </div>
      {/* Nút tìm kiếm */}
      <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-b-md text-sm">
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchHeader;