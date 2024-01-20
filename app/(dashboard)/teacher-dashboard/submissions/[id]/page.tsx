"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
const Submission = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, error, isPending } = useQuery({
    queryKey: ["submission"],
    queryFn: () =>
      fetch(`/api/teacher/submission/${id}`).then((res) => res.json()),
  });
  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  if (data.length <= 0) return "No submission yet";
  return (
    <div className="px-8 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Student Email</TableHead>
            <TableHead>Student Id</TableHead>
            <TableHead>Assignment Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((sub: any) => (
            <TableRow key={sub.id}>
              <TableCell className="font-medium">{sub.student.email}</TableCell>
              <TableCell>{sub.student.studentId}</TableCell>
              <TableCell>{sub.assignment.title}</TableCell>
              <TableCell>{sub.submissionDate.slice(0, 10)}</TableCell>
              <TableCell className="text-right">
                <Link href={sub.submission} download>
                  <Button variant={"outline"}>PDF</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Submission;
