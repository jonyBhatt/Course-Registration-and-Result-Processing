"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AnnouncementProps } from "@/types";
export const columns: ColumnDef<AnnouncementProps>[] = [
  // ...

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("content")}</div>
    ),
  },

  {
    id: "actions",
    header: "Actions",

    enableHiding: false,
    cell: ({ row }) => {
      // const params = useParams()
      const announcement = row.original;

      return (
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Announcement</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button size="lg" variant={"destructive"}>
            Delete
          </Button>
        </div>
      );
    },
  },
  // ...
];
