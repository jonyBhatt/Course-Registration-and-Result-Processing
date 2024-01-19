import SubmitAssignment from "../_components/submit-assignment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ShowAssignment from "../_components/show-assignment-details";
const SubmitAssignments = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Assignments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="secondary" className="font-bold">
              Submit Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your Assignments</DialogTitle>
            </DialogHeader>
            <SubmitAssignment id={id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="py-10">
        <ShowAssignment id={id} />
      </div>
    </section>
  );
};
export default SubmitAssignments;
