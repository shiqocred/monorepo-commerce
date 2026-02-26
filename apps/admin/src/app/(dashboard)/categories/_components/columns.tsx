import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { MetaPageProps } from "@/lib/pagination";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleDot,
  Edit,
  ImageIcon,
  Loader2,
  MoreHorizontal,
  ReceiptText,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@repo/ui/components/badge";
import { cn } from "@repo/ui/lib/utils";
import { Treaty } from "@elysiajs/eden";
import { categoriesListApi } from "../_api";

export const column = (): ColumnDef<
  Treaty.Data<typeof categoriesListApi>[number]
>[] => [
  {
    header: () => <div className="text-center">No</div>,
    id: "id",
    cell: ({ row }) => (
      <div className="text-center tabular-nums">
        {(1 + row.index).toLocaleString()}
      </div>
    ),
  },
  {
    header: "",
    accessorKey: "image",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="size-10 relative rounded overflow-hidden flex items-center justify-center border">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes={"100vw"}
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-5" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    header: () => <div className="text-xs">Status</div>,
    accessorKey: "status",
    cell: ({ row }) => (
      <div>
        <p
          className={cn(
            "px-3 py-0.5 w-fit rounded-lg font-medium",
            row.original.status ? "bg-green-200" : "bg-gray-200",
          )}
        >
          {row.original.status ? "Publish" : "Draft"}
        </p>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                // disabled={isLoading}
              >
                <span className="sr-only">Open menu</span>
                {/*{isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (*/}
                <MoreHorizontal />
                {/*)}*/}
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs"
              // onSelect={() => handleChangeStatus(product.id)}
            >
              <CircleDot className="size-3.5" />
              Set {product.status ? "draft" : "publish"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              // onSelect={() => handleMove(product.id, "detail")}
            >
              <ReceiptText className="size-3.5" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              // onSelect={() => handleMove(product.id, "edit")}
            >
              <Edit className="size-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              // onSelect={() => handleDelete(product.id)}
              className="text-xs text-red-400 focus:text-red-500 group"
            >
              <Trash2 className="size-3.5 text-red-400 group-focus:text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
