import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface School {
  logo: string;
  name: string;
  type: string;
  majors: string[];
  address: string;
  describe: string;
  slug: string;
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold",
        color || "bg-gray-100 text-gray-700"
      )}
    >
      {children}
    </span>
  );
}

const SchoolCard = ({ school }: { school: School }) => {
  if (!school) return null;
  return (
    <Card className="bg-white border-none text-black gap-2 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 group overflow-hidden">
      <div className="flex flex-col items-center p-6 pb-2">
        <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border">
          <img
            src={school.logo}
            alt={school.name}
            className="w-20 h-20 object-contain "
          />
        </div>
        <div className="font-bold text-xl text-center line-clamp-2 my-2">
          {school.name}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {school.type && (
            <Badge color="bg-green-100 text-green-700 border border-green-200">
              {school.type}
            </Badge>
          )}
          {school.address && (
            <Badge color="bg-green-100 text-green-700 border border-green-200">
              {school.address}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="px-6 mb-4">
        <p className="text-sm text-gray-500 line-clamp-3">{school.describe}</p>
      </CardContent>
      <CardFooter className="px-6 flex-1 flex items-end">
        <Link
          className="w-full cursor-pointer"
          href={`/dstruong/${school.slug}`}
        >
          <Button className="w-full cursor-pointer">Xem thêm</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SchoolCard;
