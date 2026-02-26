import { Separator } from "@repo/ui/components/separator";
import { Skeleton } from "@repo/ui/components/skeleton";

export const RangeLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Separator className="flex-auto" />
        <Skeleton className="w-87.5 h-8" />
        <Skeleton className="w-100 h-8" />
        <Separator className="flex-auto" />
      </div>
      <div className="grid grid-cols-11 gap-6 w-full">
        <Skeleton className="col-span-7 h-87.5" />
        <Skeleton className="col-span-4 h-87.5" />
      </div>
      <Separator />
    </div>
  );
};
