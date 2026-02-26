"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@repo/ui/components/button";
import { Plus, RefreshCw, XCircle } from "lucide-react";
import React from "react";
import { column } from "./columns";
import { Pagination } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { useGetCategories } from "../_api";
import { useSearchQuery } from "@/hooks/use-search";
import { parseAsString, useQueryStates } from "nuqs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/ui/components/input-group";
import { TooltipText } from "@/providers/tooltip-provider";
import { cn } from "@repo/ui/lib/utils";
import { FormDialog } from "./_dialogs/form";

export const CategoriesClient = () => {
  const [{ dialog, categoryId, sort, order }, setQuery] = useQueryStates(
    {
      dialog: parseAsString.withDefault(""),
      categoryId: parseAsString.withDefault(""),
      sort: parseAsString.withDefault("created"),
      order: parseAsString.withDefault("desc"),
    },
    {
      urlKeys: {
        categoryId: "id",
      },
    },
  );
  const { page, metaPage, limit, setLimit, setPage, setPagination } =
    usePagination();
  const { search, searchValue, setSearch } = useSearchQuery();
  const { data } = useGetCategories({
    page,
    limit,
    q: searchValue,
    order,
    sort,
  });

  console.log(data?.data.data);
  return (
    <div className="w-full flex flex-col gap-6">
      <FormDialog
        open={!!dialog}
        onOpenChange={(e) => {
          if (!e) setQuery({ dialog: "", categoryId: "" });
        }}
      />
      <div className="flex w-full flex-col gap-3">
        <div className="w-full flex items-center gap-4 justify-between">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="flex items-center gap-2">
            <InputGroup>
              <InputGroupInput
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search.length > 0 && (
                <InputGroupAddon align={"inline-end"}>
                  <InputGroupButton>
                    <XCircle />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            <TooltipText
              value="Reload data"
              render={
                <Button
                  className="size-8 flex-none disabled:opacity-100 disabled:pointer-events-auto disabled:cursor-not-allowed"
                  variant={"outline"}
                  size={"icon"}
                  // onClick={handleReload}
                  // disabled={loading}
                >
                  <RefreshCw
                    className={cn(
                      "size-3.5",
                      // loading && "animate-spin"
                    )}
                  />
                </Button>
              }
            />
          </div>
          <div className="flex items-center gap-2">
            {/*<SortTable
              order={order}
              sort={sort}
              setSort={setQuery}
              data={filterField}
            />*/}
            <Button
              className="py-0 h-8 px-3 text-xs font-medium lg:cursor-pointer"
              onClick={() => setQuery({ dialog: "create" })}
              // disabled={loading}
            >
              <Plus className="size-3" />
              Add Category
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <DataTable
          data={data?.data.data ?? []}
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
