"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadFile from "@/components/UploadFiles";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  coursecode: z.string().min(3),
  description: z.string().max(100),
  syllabus: z.string(),
  attachment: z.string(),
});

interface CourseData {
  name?: string;
  coursecode: string;
  description: string;
  syllabus: string;
  attachment: string;
}

const getCourse = (id: string) => {
  return fetch(`/api/teacher/courses/${id}`, {
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

const SingleCourseForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ["singlecourse"],
    queryFn: () => getCourse(id),
  });

  console.log(data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      coursecode: data?.coursecode || "",
      description: data?.description || "",
      syllabus: data?.syllabus || "",
      attachment: data?.attachment || "",
    },
  });

  useEffect(() => {
    // Update default values when data changes
    form.reset({
      name: data?.name ?? "",
      coursecode: data?.coursecode || "",
      description: data?.description || "",
      syllabus: data?.syllabus || "",
      attachment: data?.attachment || "",
    });
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await axios.put(`/api/teacher/courses/${id}`, values);
      toast.success(res.data);
      // form.reset()
    } catch (error: any) {
      console.log(error.message);

      toast.error("An error occurred while Updating Course details");
    }
  }
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/teacher/courses/${id}`
      );
      toast.success(res.data);
      router.push("/teacher-dashboard"); // Redirect to the appropriate page after deletion
    } catch (error: any) {
      console.error(error.message);
      toast.error("An error occurred while deleting the course");
    }
  };

  if (isPending) return "Loading....";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2  sm:grid-cols-1 gap-x-3 gap-y-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coursecode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="MAT-201" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col  gap-16">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your course" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4 sm:flex-col md:flex-row">
                <Link href={`/teacher-dashboard/assignment/${data.id}`}>
                  <Button size="lg">
                    Assignment
                    <Plus />
                  </Button>
                </Link>
                <Button size="lg">
                  Announcement
                  <Plus />
                </Button>
              </div>

              <div className="flex items-center gap-16 ">
                <FormField
                  control={form.control}
                  name="syllabus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Syllabus</FormLabel>
                      <FormControl>
                        <UploadFile
                          endpoint="pdfUpload"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attachment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attachment</FormLabel>
                      <FormControl>
                        <UploadFile
                          endpoint="multiUpload"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg">
              Update
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={handleDelete}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SingleCourseForm;
