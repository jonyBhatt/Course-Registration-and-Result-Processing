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
    return(
      <p>Loading....</p>
    )
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-x-5 gap-y-4 sm:grid-cols-1">
        {course && course.map((item) => (
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
                <Link href={`/teacher-dashboard/course/${item.id}`}>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {/* <Card className="w-[280px] border-gray-400">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                <p>Syllabus</p>
                <p>Attachment</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg">Read More</Button>
            </CardFooter>
          </Card> */}
      </div>
    </>
  );
};

export default DashboardPage;
