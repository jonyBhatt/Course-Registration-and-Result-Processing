"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SingleCourse = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, error, isPending } = useQuery({
    queryKey: ["singlecourses"],
    queryFn: () => fetch(`/api/admin/course/${id}`).then((res) => res.json()),
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: () => fetch(`/api/admin/course/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Delete Course");
      router.push("/admin-dashboard/coursemanagement");
      queryClient.invalidateQueries({ queryKey: ["singlecourses"] });
    },
    onError: () => {
      toast.error("Something wrong");
    },
  });

  if (isPending) return <Loader />;
  if (error) return "Something error" + error.message;

  console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-8" key={data.id}>
        <div className="my-6 text-white flex flex-col items-start gap-7 md:px-10 px-0 bg-slate-700 py-11 rounded-md">
          <h2 className="font-bold text-2xl">{data.name}</h2>
          <div className="flex justify-between items-center w-full">
            {/* <span className="text-sm font-normal">{data.coursecode}</span> */}
            <span className="text-sm font-normal">{data.coursecode}</span>
            <Link
              // href={data.syllabus}
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
            {/* <span className="text-sm font-light">{data.description}</span> */}
            <span className="text-sm font-light">{data.description}</span>
          </div>
          {/** Assignment */}
          {data.assignments &&
            data.assignments.map((assign: any) => (
              <Link
                href={`/student-dashboard/assignment/${assign.id}`}
                className="flex flex-col gap-4 w-full"
                key={assign.id}
              >
                <div className="p-4  border border-gray-400 rounded-lg">
                  <div className="w-full flex items-center gap-6 border-b border-b-gray-200 py-4">
                    <Image
                      src="/clip.svg"
                      alt="assignment"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col gap-2.5 items-start">
                      <span className="font-bold text-xl">
                        {data.teacher.firstname} posted a assignment:{" "}
                        {assign.title}
                      </span>
                      <span className="font-light text-sm">
                        {assign.dueDate.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-light">1 comment</div>
                </div>
              </Link>
            ))}

          {/** Announcement */}
          {data.announcements &&
            data.announcements.map((ann: any) => (
              <div className="flex flex-col gap-4 w-full" key={ann.id}>
                <div className="p-4  border border-gray-400 rounded-lg">
                  <div className="w-full flex items-center gap-6 border-b border-b-gray-200 py-4">
                    <Image
                      src="/clip.svg"
                      alt="assignment"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col gap-2.5 items-start">
                      <span className="font-bold text-xl">
                        {data.teacher.firstname} posted a announcement:{" "}
                        {ann.title}
                      </span>
                      <span className="font-light text-sm">
                        {ann.createdAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-light">1 comment</div>
                </div>
              </div>
            ))}
        </div>

        <Button variant={"destructive"} size={"lg"} onClick={() => mutate()}>
          Delete Course
        </Button>
      </div>
    </div>
  );
};
export default SingleCourse;
