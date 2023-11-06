"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  const [course, setCourse] = useState<any[]>([]);
  const getCourse = async () => {
    const courses = await axios.get("/api/teacher/courses");
    console.log(courses.data);
    setCourse(courses.data.courses);
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (!course) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 place-items-center justify-items-center gap-y-6">
        {course &&
          course.map((item) => (
            <Card className="w-[280px] border-gray-400" key={item.id}>
              <CardHeader>
                <CardTitle>{item?.name}</CardTitle>
                <CardDescription>{item?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 ">
                  <p>{item?.coursecode}</p>

                  <Link
                    href={item?.attachment}
                    download
                    className="text-xs font-bold"
                  >
                    Download Attachment
                  </Link>
                  <Link
                    href={item?.syllabus}
                    download
                    className="text-xs font-bold"
                  >
                    Download Syllabus
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg">
                  <Link href={`/student-dashboard/course/view?id=${item.id}`}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default DashboardPage;
