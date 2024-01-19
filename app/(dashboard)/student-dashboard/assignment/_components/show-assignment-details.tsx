"use client";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
const ShowAssignment = ({ id }: { id: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["assignment", id],
    queryFn: () =>
      fetch(`/api/student/assignment/${id}`).then((res) => res.json()),
  });
  if (isPending) return <Loader />;
  if (error) return "Something wrong" + error.message;
  console.log(data);
  return (
    <div className="py-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Image src="/clip.svg" alt="assignment" width={50} height={50} />
          <div className="flex flex-col items-start gap-1.5">
            <h3 className="font-bold text-2xl">{data.title}</h3>
            <div className="flex gap-2.5 items-center text-gray-500 ">
              <span className="text-sm">
                {data.teacher.firstname}
                {data.teacher.lastname}
              </span>
              <span className="text-sm">Create At</span>
            </div>
          </div>
        </div>
        <span>Due Date: {data.dueDate.slice(0, 10)}</span>
      </div>
      <div className="mt-10 ml-6">
        <h3>Description: </h3>
        <span>{data.description}</span>
      </div>
    </div>
  );
};

export default ShowAssignment;
