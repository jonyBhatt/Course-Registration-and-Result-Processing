"use client";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
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
const Mycourse = () => {
  interface CourseItems {
    id: string;
    name: string;
    coursecode: string;
    description: string;
  }
  const { data, isPending, error } = useQuery({
    queryKey: ["mycourse"],
    queryFn: () => fetch("/api/student/mycourse").then((res) => res.json()),
  });

  if (isPending) return <Loader />;

  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  if (data.length <= 0) return "No course yet! please enroll first";
  return (
    <div className="py-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-x-5 gap-y-4 sm:grid-cols-1">
        {data.map((item: CourseItems) => (
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
              <Button size="lg">
                <Link href={`/student-dashboard/mycourses/${item.id}`}>
                  View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Mycourse;
