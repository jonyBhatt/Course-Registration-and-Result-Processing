"use client";

import { Button } from "@/components/ui/button";
import { CourseProps } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleCoursePage = () => {
  const [data, setData] = useState<CourseProps>();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  //   console.log(id);

  useEffect(() => {
    const courseDetails = async () => {
      const res = await axios.get(`/api/student/single-course/${id}`);
      console.log(res.data);
      setData(res.data.details);
    };
    courseDetails();
  }, [id]);
  console.log(data);

  return (
    <>
      {!data && <p>Loading...</p>}
      {data && (
        <div className="flex flex-col gap-8">
          <div className="my-6 text-white flex flex-col items-start gap-7 md:px-10 px-0 bg-slate-700 py-11 rounded-md">
            <h2 className="font-bold text-2xl">{data.name}</h2>
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-normal">{data.coursecode}</span>
              <Link
                href={data.syllabus}
                target="_blank"
                download
                className="text-sm"
              >
                Download Syllabus
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Requirements</h2>
              <ol className="list-disc mx-4">
                <li className="px-3 mb-2">
                  Only the very basic computer skills are needed
                </li>
                <li className="px-3 mb-2">
                  A computer, Access to the internet, An interest in learning
                  Python
                </li>
              </ol>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Description</h2>
              <span className="text-sm font-light">{data.description}</span>
            </div>

            <Button size="lg" variant="default">
              Enroll
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCoursePage;
