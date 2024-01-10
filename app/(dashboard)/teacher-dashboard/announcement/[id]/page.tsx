import { Button } from "@/components/ui/button";
import AllAnnouncements from "../../_components/AllAnouncements";
import CreateAnnouncement from "../../_components/create-announcement";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const Announcement = ({ params }: { params: { id: string } }) => {
  const { id } = params;
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
            <CreateAnnouncement id={id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <div className="container mx-auto py-10">
          {/* <DataTable columns={columns} data={data} /> */}
          <AllAnnouncements id={id} />
        </div>
      </div>
    </div>
  );
};
export default Announcement;
