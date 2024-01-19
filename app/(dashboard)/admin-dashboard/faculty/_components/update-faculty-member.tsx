"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Invalid email"),
  gender: z.string(),
  department: z.string(),
  designation: z.string(),
  address: z.string(),
  image: z.string(),
});
const UpdateFacultyMember = ({ params }: { params: { id: string } }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getFacultyMember"],
    queryFn: () => fetch("/api/admin/faculty").then((res) => res.json()),
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      gender: data?.gender || "",
      department: data?.department || "",
      designation: data?.designation || "",
      address: data?.address || "",
      image: data?.image || "",
    },
  });
  useEffect(() => {
    // Update default values when data changes
    form.reset({
      name: data?.name ?? "",
      email: data?.email || "",
      gender: data?.gender || "",
      department: data?.department || "",
      designation: data?.designation || "",
      address: data?.address || "",
      image: data?.image || "",
    });
  }, [data, form]);
  const { id } = params;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // try {
    //   const res = await axios.put(`/api/admin/faculty/${id}`, values);
    //   console.log(res.data);
    //   toast.success(res.data);
    //   form.reset();
    //   router.push("/admin-dashboard/faculty");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something wrong to create course");
    // }
    console.log(values);
  }
  if (isPending) return <Loader />;
  if (error) return "Something error" + error.message;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-4 place-content-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Male or female" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadFile
                      endpoint="imageUploader"
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
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateFacultyMember;
