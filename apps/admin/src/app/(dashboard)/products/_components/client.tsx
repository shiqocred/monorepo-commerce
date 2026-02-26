"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { column } from "./columns";
import { Pagination } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

export const ProductsClient = () => {
  const { page, metaPage, limit, setLimit, setPage, setPagination } =
    usePagination();
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex items-center gap-4 justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex items-center gap-2">
          <Link href={"/products/create"}>
            <Button
              className="py-0 h-8 px-3 text-xs font-medium lg:cursor-pointer"
              // disabled={loading}
            >
              <Plus className="size-3" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <DataTable
          data={[]}
          // isLoading={isPending}
          columns={column()}
        />
        <Pagination
          pagination={{ ...metaPage, current: page, limit }}
          setPaginationAction={setPage}
          setLimitAction={setLimit}
          // disabled={loading}
        />
      </div>
    </div>
  );
};
