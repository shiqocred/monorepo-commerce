import { Skeleton } from "@repo/ui/components/skeleton";
import React from "react";

export const SummaryLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="col-span-4 h-37.5" />
      <div className="grid grid-cols-2 gap-6 w-full">
        <Skeleton className="w-full h-75" />
        <Skeleton className="w-full h-75" />
      </div>
    </div>
  );
};
