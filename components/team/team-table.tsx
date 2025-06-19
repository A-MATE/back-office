"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

import { Team } from "@/types/team";
import { useTeams } from "@/hooks/team/use-teams";
import { isValidImageUrl } from "@/lib/utils";

const columnHelper = createColumnHelper<Team>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => <span className="font-mono">{info.getValue()}</span>,
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) =>
      info.getValue() || <span className="text-muted-foreground">-</span>,
  }),
  columnHelper.accessor("logo", {
    header: () => "Logo",
    cell: (info) => {
      const logo = info.getValue();
      const thumbnail = logo?.thumbnail;

      return isValidImageUrl(thumbnail) ? (
        <Image
          src={thumbnail as string}
          alt="logo"
          className="h-8 w-8 object-contain rounded"
          width={32}
          height={32}
        />
      ) : (
        <span className="text-muted-foreground">No logo</span>
      );
    },
  }),
  columnHelper.accessor("ageGroup", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Age Group
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: (info) =>
      info.getValue() || <span className="text-muted-foreground">-</span>,
  }),

  columnHelper.accessor("gender", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Gender
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: (info) =>
      info.getValue() || <span className="text-muted-foreground">-</span>,
  }),

  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => format(new Date(info.getValue()), "PP"),
  }),
  columnHelper.accessor("updatedAt", {
    header: () => "Updated At",
    cell: (info) =>
      info.getValue() ? format(new Date(info.getValue()!), "PP") : "-",
  }),
  columnHelper.accessor("isActive", {
    header: () => "Status",
    cell: (info) =>
      info.getValue() ? (
        <span className="text-green-600 font-medium">Active</span>
      ) : (
        <span className="text-red-600 font-medium">Inactive</span>
      ),
  }),
  columnHelper.accessor("deletedAt", {
    header: () => "Deleted At",
    cell: (info) =>
      info.getValue() ? (
        format(new Date(info.getValue()!), "PP")
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => "Actions",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <Button asChild size="sm" variant="outline">
          <Link href={`/team/${row.original.id}`}>View</Link>
        </Button>
      </div>
    ),
  }),
];

export const TeamTable = () => {
  const { data: teams = [], isLoading, error } = useTeams();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: teams,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-24 w-full text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-muted/50">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
