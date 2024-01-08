import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AssignmentForm from "../../_components/create-assignment";
import Assignments from "../../_components/show-assignments";

const Assignment = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Assignments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="outline">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your Assignments</DialogTitle>
            </DialogHeader>
            <AssignmentForm id={id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="py-10">
        <Assignments params={{ id }} />
      </div>
    </section>
  );
};

export default Assignment;
