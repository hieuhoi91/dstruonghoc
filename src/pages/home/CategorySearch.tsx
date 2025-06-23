'use client'

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronDown, List, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [
    {
        id: 'loai-truong',
        name: 'Loại Trường',
        jobs: [
            {
                id: 'sales-xnk',
                name: 'Sales Xuất nhập khẩu/Logistics',
                positions: ['Sales Logistics', 'Sales Xuất nhập khẩu/Logistics khác']
            },
            {
                id: 'sales-bds',
                name: 'Sales Bất động sản/Xây dựng',
                positions: [
                    'Sales bất động sản/Môi giới bất động sản',
                    'Kinh doanh thiết bị/vật liệu xây dựng',
                    'Kinh doanh nội thất',
                    'Sales Bất động sản/Xây dựng khác'
                ]
            },
            {
                id: 'sales-giao-duc',
                name: 'Sales Giáo dục/Khóa học',
                positions: ['Tư vấn tuyển sinh/khoá học', 'Tư vấn du học', 'Sales Giáo dục/Khóa học khác']
            }
        ]
    },
    {
        id: 'chuyen-nganh',
        name: 'Chuyên Ngành',
        jobs: [
            {
                id: 'digital-marketing',
                name: 'Digital Marketing',
                positions: ['SEO/SEM', 'Social Media Marketing', 'Email Marketing']
            },
            {
                id: 'content-marketing',
                name: 'Content Marketing',
                positions: ['Content Writer', 'Content Strategist']
            }
        ]
    },
];


const CategorySearch = () => {
  const [open, setOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [stagedSelectedJobs, setStagedSelectedJobs] = useState<string[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [itemCat, setItemCat] = useState<any>(null)

  useEffect(() => {
    if (open) {
      setStagedSelectedJobs(selectedJobs);
    }
  }, [open]);

  const handleJobChange = (jobId: string) => {
    setStagedSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const jobIdsInCategory = category.jobs.map(j => j.id);
    const allSelected = jobIdsInCategory.every(id => stagedSelectedJobs.includes(id));

    if (allSelected) {
      setStagedSelectedJobs(prev => prev.filter(id => !jobIdsInCategory.includes(id)));
    } else {
      const newSelectedJobs = [...new Set([...stagedSelectedJobs, ...jobIdsInCategory])];
      setStagedSelectedJobs(newSelectedJobs);
    }
  };

  const getCategoryCheckboxState = (categoryId: string): boolean | 'indeterminate' => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return false;

    const jobIdsInCategory = category.jobs.map(j => j.id);
    const selectedInCategory = jobIdsInCategory.filter(id => stagedSelectedJobs.includes(id));

    if (selectedInCategory.length === 0) return false;
    if (selectedInCategory.length === jobIdsInCategory.length) return true;
    return 'indeterminate';
  }

  const handleConfirm = () => {
    setSelectedJobs(stagedSelectedJobs);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const jobsToShow = activeCategoryId
    ? categories.find(c => c.id === activeCategoryId)?.jobs ?? []
    : [];

  useEffect(() =>{
      setItemCat(categories.find(i => i.id === activeCategoryId))
  },[activeCategoryId]) 
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 border text-sm font-medium text-gray-700 ${open ? 'bg-gray-100' : 'bg-white'}`}>
          <List className="h-4 w-4" />
          Danh mục
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[1074px] absolute top-4 -left-[74px]" >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Chọn Trường Phù Hợp Với Phong Cách Của Bạn !</h2>
          <button onClick={() => setOpen(false)} className="p-1 rounded-full cursor-pointer hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 border-t">
          <div className="border-r col-span-1">
            <h3 className="p-4 font-semibold text-gray-500 text-sm">DANH MỤC</h3>
            <ScrollArea className="h-80">
                <div className="p-2">
                    {categories.map((category) => (
                        <div key={category.id} 
                             onMouseEnter={() => setActiveCategoryId(category.id)}
                             className={cn("flex items-center justify-between p-2 rounded-md cursor-pointer", {
                                "bg-gray-100": activeCategoryId === category.id,
                                "text-green-600": activeCategoryId === category.id || getCategoryCheckboxState(category.id) !== false
                             })}
                        >
                            <label className="flex items-center gap-3 cursor-pointer w-full">
                                <Checkbox 
                                    onClick={(e) => e.stopPropagation()}
                                    onCheckedChange={() => handleCategoryChange(category.id)}
                                    checked={getCategoryCheckboxState(category.id)}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=indeterminate]:bg-green-600 data-[state=indeterminate]:border-green-600"
                                />
                                {category.name}
                            </label>
                            <ChevronDown className="-rotate-90 h-4 w-4" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
          </div>
          <div className="col-span-2">
            <h3 className="p-4 font-semibold text-gray-500 text-sm">{itemCat?.name.toUpperCase()}</h3>
            <div className="relative mx-4 mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Nhập từ khóa tìm kiếm" className="pl-10 shadow-none focus-visible:ring-1 focus-visible:ring-offset-0" />
            </div>
            <div className="px-4"><Separator className="bg-gray-200 h-px px-2" /></div>
            <ScrollArea className="h-100 mt-4">
                <div className="px-4 space-y-4">
                    {jobsToShow.length > 0 ? (
                      jobsToShow.map((job) => (
                        <div key={job.id} className="flex items-center gap-3">
                            <Checkbox 
                                id={job.id} 
                                onCheckedChange={() => handleJobChange(job.id)}
                                checked={stagedSelectedJobs.includes(job.id)}
                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                            />
                            <label htmlFor={job.id} className="cursor-pointer">{job.name}</label>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">Di chuột qua một nhóm nghề để xem các nghề.</div>
                    )}
                </div>
            </ScrollArea>
          </div>
          
        </div>
        <div className="flex justify-end items-center gap-2 pt-4 border-t mt-4">
            <button 
                onClick={() => setStagedSelectedJobs([])}
                className="text-sm font-medium cursor-pointer  text-gray-500 hover:text-gray-800"
            >
                Bỏ chọn tất cả
            </button>
            <div className="h-4 border-l border-gray-300 mx-2"></div>
            <button 
                onClick={handleCancel}
                className="px-5 py-1.5 rounded-full cursor-pointer  bg-gray-100 text-sm font-medium text-gray-800 hover:bg-gray-200"
            >
                Hủy
            </button>
            <button 
                onClick={handleConfirm}
                className="px-5 py-1.5 cursor-pointer rounded-full bg-green-600 text-sm font-medium text-white hover:bg-green-700"
            >
                Chọn
            </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySearch;