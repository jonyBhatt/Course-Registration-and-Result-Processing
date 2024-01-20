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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().min(3).email().optional(),
  image_url: z.string().optional(),
});

const UpdateProfile = () => {
  const router = useRouter();

  const { data, error, isPending } = useQuery({
    queryKey: ["teacherprofile"],
    queryFn: () => fetch("/api/admin/profile").then((res) => res.json()),
  });

  console.log(data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      image_url: data?.image_url || "",
    },
  });
  useEffect(() => {
    // Update default values when data changes
    form.reset({
      name: data?.name ?? "",
      email: data?.email || "",
      image_url: data?.image_url || "",
    });
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await axios.put(`/api/admin/profile/${data?.id}`, values);
      toast.success(res.data);
      // form.reset()
    } catch (error: any) {
      console.log(error.message);

      toast.error("An error occurred while Updating Course details");
    }
  }
  if (isPending) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="font-bold mb-8 text-3xl">Profile Setting</h2>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <UploadFile
                        endpoint="imageUploader"
                        onChange={field.onChange}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" size="lg">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default UpdateProfile;
