import { Button } from "@/components/ui/button";
import { columns } from "@/components/DataTable/cloumn";
import { DataTable } from "@/components/DataTable/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAnnouncement from "../_components/create-announcement";
import { AnnouncementProps } from "@/types";

async function getData(): Promise<AnnouncementProps[]> {
  // Fetch data from your API here.
  return [
    {
      title: "Algorithm",
      content:
        "lorem ipsum sit amet consectetur, Maiores eligendi placeat ratione dolor aut sequi sequi consequuntur voluptates ",
      courseName: "Abe45@gmail.com",
    },
    {
      title: "Algorithm",
      content:
        "lorem ipsum sit amet consectetur, Maiores eligendi placeat ratione dolor aut sequi sequi consequuntur voluptates",
      courseName: "Monserrat44@gmail.com",
    },
    {
      title: "Algorithm",
      content:
        "lorem ipsum sit amet consectetur, Maiores eligendi placeat ratione dolor aut sequi sequi consequuntur voluptates",
      courseName: "Silas22@gmail.com",
    },
    {
      title: "Algorithm",
      content:
        "lorem ipsum sit amet consectetur, Maiores eligendi placeat ratione dolor aut sequi sequi consequuntur voluptates",
      courseName: "carmella@hotmail.com",
    },
  ];
}

const Announcement = async () => {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Announcements</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Provide all information to create announcement
              </DialogDescription>
            </DialogHeader>
            <CreateAnnouncement />
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Announcement;
