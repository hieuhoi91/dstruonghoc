"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import categoriesData from "@/data/major.json";
import { cn } from "@/lib/utils";
import { ChevronDown, List, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  name: string;
  positions?: string[];
}

interface Category {
  id: string;
  name: string;
  list: Job[];
}

const categories = categoriesData as Category[];

const CategorySearch = () => {
  const [open, setOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [stagedSelectedJobs, setStagedSelectedJobs] = useState<string[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [itemCat, setItemCat] = useState<Category | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [stagedSelectedPositions, setStagedSelectedPositions] = useState<
    string[]
  >([]);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);
  const [lastHoveredJobId, setLastHoveredJobId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStagedSelectedJobs(selectedJobs);
      setStagedSelectedPositions(selectedPositions);
    }
  }, [open]);

  const handleJobChange = (jobId: string) => {
    const job = jobsToShow.find((j) => j.id === jobId);
    if (!job) return;

    const isJobSelected = stagedSelectedJobs.includes(jobId);

    // Update selected jobs
    setStagedSelectedJobs((prev) =>
      isJobSelected ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );

    // Only update positions if the job has positions
    if (job.positions?.length) {
      if (isJobSelected) {
        // If unselecting job, remove all its positions
        setStagedSelectedPositions((prev) =>
          prev.filter((pos) => !job.positions?.includes(pos))
        );
      } else {
        // If selecting job, add all its positions
        setStagedSelectedPositions((prev) => [
          ...new Set([...prev, ...(job.positions || [])]),
        ]);
      }
    }
  };

  const handlePositionChange = (position: string) => {
    const jobWithPosition = jobsToShow.find((job) =>
      job.positions?.includes(position)
    );
    if (!jobWithPosition) return;

    const isJobSelected = stagedSelectedJobs.includes(jobWithPosition.id);

    if (!isJobSelected) {
      // If job isn't selected, select it first
      setStagedSelectedJobs((prev) => [...prev, jobWithPosition.id]);
    }

    setStagedSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((pos) => pos !== position)
        : [...prev, position]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    // Get jobs with positions
    const jobsWithPositions = category.list.filter(
      (job) => job.positions?.length
    );
    const allJobs = category.list.map((job) => job.id);

    const allSelected = allJobs.every((id) => stagedSelectedJobs.includes(id));

    if (allSelected) {
      // Unselect all jobs in category
      setStagedSelectedJobs((prev) =>
        prev.filter((id) => !allJobs.includes(id))
      );
      // Remove all positions from jobs in this category
      const positionsToRemove = jobsWithPositions.flatMap(
        (job) => job.positions || []
      );
      setStagedSelectedPositions((prev) =>
        prev.filter((pos) => !positionsToRemove.includes(pos))
      );
    } else {
      // Select all jobs in category
      const newSelectedJobs = [...new Set([...stagedSelectedJobs, ...allJobs])];
      setStagedSelectedJobs(newSelectedJobs);
      // Add all positions from jobs in this category
      const positionsToAdd = jobsWithPositions.flatMap(
        (job) => job.positions || []
      );
      setStagedSelectedPositions((prev) => [
        ...new Set([...prev, ...positionsToAdd]),
      ]);
    }
  };

  const getJobCheckboxState = (jobId: string): boolean | "indeterminate" => {
    const job = jobsToShow.find((j) => j.id === jobId);
    if (!job) return false;

    // If job has no positions, just check if it's selected
    if (!job.positions?.length) {
      return stagedSelectedJobs.includes(jobId);
    }

    const jobPositions = job.positions;
    const selectedPositionsInJob = jobPositions.filter((pos) =>
      stagedSelectedPositions.includes(pos)
    );

    if (selectedPositionsInJob.length === 0) return false;
    if (selectedPositionsInJob.length === jobPositions.length) return true;
    return "indeterminate";
  };

  const getCategoryCheckboxState = (
    categoryId: string
  ): boolean | "indeterminate" => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return false;

    const jobIdsInCategory = category.list.map((j) => j.id);
    const selectedInCategory = jobIdsInCategory.filter((id) =>
      stagedSelectedJobs.includes(id)
    );

    if (selectedInCategory.length === 0) return false;
    if (selectedInCategory.length === jobIdsInCategory.length) return true;
    return "indeterminate";
  };

  const handleConfirm = () => {
    setSelectedJobs(stagedSelectedJobs);
    setSelectedPositions(stagedSelectedPositions);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const jobsToShow = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)?.list ?? []
    : [];

  const getPositionsToShow = () => {
    if (lastHoveredJobId) {
      const hoveredJob = jobsToShow.find((job) => job.id === lastHoveredJobId);
      return hoveredJob?.positions || [];
    }
    return [];
  };

  const positionsToShow = getPositionsToShow();

  useEffect(() => {
    if (hoveredJobId) {
      setLastHoveredJobId(hoveredJobId);
    }
  }, [hoveredJobId]);

  useEffect(() => {
    setLastHoveredJobId(null);
  }, [activeCategoryId]);

  useEffect(() => {
    const category = categories.find((i) => i.id === activeCategoryId);
    setItemCat(category || null);
  }, [activeCategoryId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center cursor-pointer gap-1 px-3 py-2 rounded-md hover:bg-gray-100 border text-sm font-medium text-gray-700 ${
            open ? "bg-gray-100" : "bg-white"
          }`}
        >
          <List className="h-4 w-4" />
          Danh mục
          <ChevronDown className="h-3 w-3 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-[1074px] absolute top-4 -left-[74px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Chọn Trường Phù Hợp Với Phong Cách Của Bạn !
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full cursor-pointer hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 border-t">
          <div className="border-r col-span-1">
            <h3 className="p-4 font-semibold text-gray-500 text-sm">
              DANH MỤC
            </h3>
            <ScrollArea className="h-80">
              <div className="p-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onMouseEnter={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md cursor-pointer",
                      {
                        "bg-gray-100": activeCategoryId === category.id,
                        "text-green-600":
                          activeCategoryId === category.id ||
                          getCategoryCheckboxState(category.id) !== false,
                      }
                    )}
                  >
                    <label className="flex items-center gap-3 cursor-pointer w-full">
                      <Checkbox
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() =>
                          handleCategoryChange(category.id)
                        }
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
          <div className="col-span-2 border-r">
            <h3 className="p-4 font-semibold text-gray-500 text-sm">
              {itemCat?.name.toUpperCase()}
            </h3>
            <div className="relative mx-4 mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Nhập từ khóa tìm kiếm"
                className="pl-10 shadow-none focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
            <div className="px-4">
              <Separator className="bg-gray-200 h-px px-2" />
            </div>
            <ScrollArea className="h-60 mt-4">
              <div className="px-4 space-y-4">
                {jobsToShow.length > 0 ? (
                  jobsToShow.map((job) => (
                    <div
                      key={job.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer",
                        {
                          "bg-gray-100":
                            hoveredJobId === job.id ||
                            lastHoveredJobId === job.id,
                          "text-green-600": stagedSelectedJobs.includes(job.id),
                        }
                      )}
                      onMouseEnter={() => setHoveredJobId(job.id)}
                      onMouseLeave={() => setHoveredJobId(null)}
                    >
                      <label className="flex items-center gap-3 cursor-pointer w-full">
                        <Checkbox
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => handleJobChange(job.id)}
                          checked={getJobCheckboxState(job.id)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=indeterminate]:bg-green-600 data-[state=indeterminate]:border-green-600"
                        />
                        {job.name}
                      </label>
                      {job.positions && job.positions.length > 0 && (
                        <ChevronDown className="-rotate-90 h-4 w-4" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">
                    Di chuột qua một nhóm ngành để xem các chuyên ngành chính.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="col-span-1">
            <h3 className="p-4 font-semibold text-gray-500 text-sm">
              CHUYÊN NGÀNH CHÍNH
            </h3>
            <ScrollArea className="h-80">
              <div className="px-4 space-y-2">
                {positionsToShow.length > 0 ? (
                  positionsToShow.map((position) => (
                    <div
                      key={position}
                      onMouseEnter={() => {
                        setHoveredJobId(lastHoveredJobId);
                      }}
                      onMouseLeave={() => setHoveredJobId(null)}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer",
                        {
                          "bg-gray-100": hoveredJobId === position,
                          "text-green-600":
                            stagedSelectedPositions.includes(position),
                        }
                      )}
                    >
                      <label className="flex items-center gap-3 cursor-pointer w-full">
                        <Checkbox
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => handlePositionChange(position)}
                          checked={stagedSelectedPositions.includes(position)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <span className="text-sm">{position}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 p-2">
                    Di chuột qua một ngành để xem các vị trí.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 pt-4 border-t mt-4">
          <button
            onClick={() => {
              setStagedSelectedJobs([]);
              setStagedSelectedPositions([]);
            }}
            className="text-sm font-medium cursor-pointer text-gray-500 hover:text-gray-800"
          >
            Bỏ chọn tất cả
          </button>
          <div className="h-4 border-l border-gray-300 mx-2"></div>
          <button
            onClick={handleCancel}
            className="px-5 py-1.5 rounded-full cursor-pointer bg-gray-100 text-sm font-medium text-gray-800 hover:bg-gray-200"
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
