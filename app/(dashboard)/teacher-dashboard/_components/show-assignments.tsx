"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AssignmentProps } from "@/types";
import { ChangeTime } from "@/lib/timeFormat";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Assignments = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get("/api/teacher/assignment");
    console.log(res.data);
    setData(res.data.assignments);
  };

  const handleDelete = async (id: string) => {
    const res = await axios.delete(`/api/teacher/assignment/${id}`);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className=" grid grid-cols-2  gap-x-4 lg:grid-cols-4 gap-y-8  ">
        {data.map((ctx: AssignmentProps) => (
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
            <div className="flex justify-center items-center gap-4">
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
