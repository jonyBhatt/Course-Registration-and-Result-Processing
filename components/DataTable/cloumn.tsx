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
import EditAnnouncement from "@/app/(dashboard)/teacher-dashboard/_components/edit-announcement";
import axios from "axios";
import { toast } from "sonner";
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
      const handleDelete = async (id: string) => {
        try {
          await axios.delete(`/api/teacher/announcement/${id}`);
          toast.success("Delete announcement");
        } catch (error) {
          console.log(error);
        }
      };
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
              <EditAnnouncement id={announcement.id} />
            </DialogContent>
          </Dialog>
          <Button
            size="lg"
            variant={"destructive"}
            onClick={() => handleDelete(announcement.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
  // ...
];
