"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
const AllCoursesShow = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["allcourse"],
    queryFn: () => fetch("/api/student/allcourses").then((res) => res.json()),
  });

  // const handleEnroll = async (courseId: string) => {
  //   try {
  //     // Make an API request to send enrollment request
  //     const response = await axios.post(`/api/student/enroll/${courseId}`);

  //     toast.success("Enrollment request sent successfully!");
  //   } catch (error) {
  //     console.error(
  //       "An error occurred while sending enrollment request:",
  //       error
  //     );
  //   }
  // };

  if (isPending) return <Loader />;

  interface CourseItems {
    id: string;
    name: string;
    coursecode: string;
    description: string;
  }

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="py-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-x-5 gap-y-4 sm:grid-cols-1">
        {data.courses.map((item: CourseItems) => (
          <Card className="w-[280px] border-gray-400" key={item.id}>
            <CardHeader>
              <CardTitle>{item?.name}</CardTitle>
              <CardDescription>{item?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-3 gap-y-5 ">
                <p>{item?.coursecode}</p>

                {/* <Link
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
                  </Link> */}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/admin-dashboard/coursemanagement/${item.id}`}>
                <Button size="lg">Enter the course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesShow;
