"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import CategorySearch from "./CategorySearch";
import ProvinceSelect from "./ProvinceSelect";

const SearchHeader = () => {
  const [selectedProvince, setSelectedProvince] = useState("");

  return (
    <div className="flex items-center bg-white rounded-lg shadow p-2 gap-4 w-full mx-auto">
      {/* Dropdown danh mục nghề */}
      <CategorySearch />
      {/* Input tìm kiếm */}
      <div className="flex items-center gap-2 flex-2">
        <span className="material-icons text-base">
          <Search />
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm trường đại học"
          className="px-1 flex-1 py-2 bg-transparent outline-none text-sm text-gray-700"
        />
      </div>
      {/* Địa điểm */}
      <ProvinceSelect
        selectedProvince={selectedProvince}
        onProvinceChange={setSelectedProvince}
      />
      {/* Nút tìm kiếm */}
      <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-b-md text-sm">
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchHeader;
