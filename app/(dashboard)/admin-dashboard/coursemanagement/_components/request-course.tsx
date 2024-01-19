"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const RequestedCourse = () => {
  const queryClient = useQueryClient();
  const { data, error, isPending } = useQuery({
    queryKey: ["approvecourse"],
    queryFn: () => fetch("/api/admin/enroll").then((res) => res.json()),
  });

  const { mutate } = useMutation({
    mutationKey: ["updateApproval"],
    mutationFn: (id: string) =>
      fetch(`/api/admin/enroll/${id}`, { method: "PUT" }),
    onSuccess: () => {
      toast.success("Course Approved");
      queryClient.invalidateQueries({ queryKey: ["approvecourse"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleApprove = (id: string) => {
    mutate(id);
  };

  if (isPending) return <Loader />;

  if (error) return "Something error" + error.message;

  console.log(data);

  return (
    <div className="py-10">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ctx) => (
            <TableRow key={ctx.id}>
              <TableCell className="font-medium">{ctx.id}</TableCell>
              <TableCell>{ctx.course.name}</TableCell>
              <TableCell>
                {ctx.stundets.firstName} {ctx.stundets.lastName}
              </TableCell>
              <TableCell className="text-center">{ctx.status}</TableCell>
              <TableCell className="text-right flex items-center gap-4">
                {ctx.status === "APPROVED" ? (
                  <>
                    <Button disabled>Approve</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleApprove(ctx.id)}>
                      Approve
                    </Button>
                  </>
                )}

                <Button variant={"destructive"}>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell className="text-center">Pending</TableCell>
            <TableCell className="text-right flex items-center gap-4">
              <Button>Approve</Button>
              <Button variant={"destructive"}>Cancel</Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};
export default RequestedCourse;
