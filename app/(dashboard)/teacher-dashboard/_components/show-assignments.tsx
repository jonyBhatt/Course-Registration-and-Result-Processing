"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AssignmentProps } from "@/types";
import { ChangeTime } from "@/lib/timeFormat";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
const getAssignment = (id: string) => {
  return fetch(`/api/teacher/assignment/${id}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed!");
      }

      return res.json();
    })
    .catch((error) => {
      console.error(error);
      // Handle the error as needed
    });
};
const Assignments = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // const [data, setData] = useState([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => getAssignment(id),
  });

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/teacher/assignment/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  if (isPending) return "Loading...";

  if (error) return "Something wrong cannot fetch assignment.." + error.message;
  if (data.length <= 0) return "No assignment yet!";

  console.log(data);

  return (
    <div className="">
      <div className=" grid grid-cols-2  gap-x-4 lg:grid-cols-4 gap-y-8  ">
        {data.assignments.map((ctx: AssignmentProps) => (
          <div
            key={ctx.id}
            className="p-4 bg-gray-200 rounded-lg flex flex-col gap-4  "
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold">{ctx.title}</h1>
              <span className="text-xs text-gray-600 font-light">
                {ChangeTime(ctx.dueDate)}
              </span>
            </div>
            <span>{ctx.description}</span>
            <Link href={`/teacher-dashboard/submissions/${ctx.id}`}>
              <Button size="lg" variant={"link"}>
                Submissions
              </Button>
            </Link>
            <div className="flex justify-start items-center gap-4">
              <Button size="sm">
                <Link href={`/teacher-dashboard/assignment/edit?id=${ctx.id}`}>
                  Edit
                </Link>
              </Button>
              <Button
                size="sm"
                variant={"destructive"}
                onClick={() => handleDelete(ctx.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
