import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";





function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className={cn("px-3 py-2 rounded-lg text-xs font-semibold text-white", color)}>
      {children}
    </span>
  );
}

const SchoolCard = ({ school }: { school: any}) => {
  return (
    <Card className="bg-white border-none text-black">
      <CardHeader className="flex justify-center items-center gap-3 px-6 pt-2 pb-2">
        <img
          src={school.logo}
          alt={school.name}
          className="w-16 h-16 rounded-lg object-contain bg-gray-200 p-2"
        />
      </CardHeader>
      <CardContent className="px-6 w-full">
        <div className="font-semibold text-lg mb-1 text-center w-full">{school.name}</div>
        <div className="text-center text-sm text-gray-400 w-full">
          {school.acronym }
        </div>
      </CardContent>
      <div className="px-4"><Separator className="bg-gray-200 h-px px-2" /></div>
      <div className="flex flex-wrap gap-2 justify-center">
        {school.majors && school.majors.map((major: string, idx: number) => (
          <Badge key={idx} color="bg-gray-200 text-black">{major}</Badge>
        ))}
      </div>
      
    </Card>
  );
}

export default SchoolCard;
