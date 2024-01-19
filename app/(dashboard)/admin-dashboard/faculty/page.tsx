import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FacultyMember from "./_components/faculty-members";
import AddFacultyMember from "./_components/add-faculty";
const Faculty = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">Faculty</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="secondary" className="font-bold">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Faculty member</DialogTitle>
            </DialogHeader>
            <AddFacultyMember />
          </DialogContent>
        </Dialog>
      </div>
      <FacultyMember />
    </div>
  );
};
export default Faculty;
