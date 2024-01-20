"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const FacultyMember = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getFacultyMember"],
    queryFn: () => fetch("/api/admin/faculty").then((res) => res.json()),
  });

  if (isPending) return <Loader />;
  if (error) return "Something error" + error.message;
  console.log(data);

  return (
    <div className="my-8">
      <Table className="border border-gray-400 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Personal Information</TableHead>
            <TableHead className="">Other Information</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ctx: any) => (
            <TableRow key={ctx.id}>
              <TableCell className="font-medium">{ctx.id}</TableCell>
              <TableCell>
                <Image
                  src={ctx.image}
                  alt="user"
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                />
              </TableCell>
              <TableCell>
                <p className="">
                  <b>Name:</b>
                  {ctx.name}
                </p>
                <p className="">
                  <b>Email:</b>
                  {ctx.email}
                </p>
                <p className="">
                  <b>Gender:</b>
                  {ctx.gender}
                </p>
              </TableCell>
              <TableCell className="">
                <p className="">
                  <b>Department:</b>
                  {ctx.department}
                </p>
                <p className="">
                  <b>Designation:</b>
                  {ctx.designation}
                </p>
                <p className="">
                  <b>Address:</b>
                  {ctx.address}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FacultyMember;
