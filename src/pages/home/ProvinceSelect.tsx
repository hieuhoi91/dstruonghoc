import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import provinces from "@/data/provinces.json";
import { ChevronDown, MapPin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

interface Province {
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
}

interface ProvinceSelectProps {
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
}

const ProvinceSelect = ({
  selectedProvince,
  onProvinceChange,
}: ProvinceSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const provinceList = Object.values(provinces) as Province[];

  const filteredProvinces = useMemo(() => {
    return provinceList.filter((province) =>
      province.name_with_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleClearProvince = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onProvinceChange("");
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-1 items-center gap-2 bg-gray-100 rounded-full p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors">
          <span className="material-icons text-xs text-primary">
            <MapPin />
          </span>
          <span className="text-sm flex-1 text-left">
            {selectedProvince || "Chọn tỉnh/thành phố"}
          </span>
          {selectedProvince ? (
            <button
              type="button"
              onClick={handleClearProvince}
              className="p-1 hover:bg-gray-300 rounded-full cursor-pointer pointer-events-auto relative z-10"
            >
              <X className="w-3 h-3" />
            </button>
          ) : null}
          <span className="material-icons text-xs ml-1">
            <ChevronDown />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] overflow-y-auto w-[250px] pt-0">
        <div className="px-2 py-2 sticky top-0 bg-white border-b z-10">
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        {filteredProvinces.map((province) => (
          <DropdownMenuItem
            key={province.code}
            onClick={() => onProvinceChange(province.name)}
            className="cursor-pointer hover:bg-gray-100"
          >
            {province.name_with_type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProvinceSelect;
