"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { announcementSchema } from "@/lib/validation/announcementValidation";
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
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useEffect } from "react";

const EditAnnouncement = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { data, error, isPending } = useQuery({
    queryKey: ["announce"],
    queryFn: () =>
      fetch(`/api/teacher/announcement/${id}`).then((res) => res.json()),
  });
  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof announcementSchema>) =>
      await axios.put(`/api/teacher/announcement/${id}`, values),
    onSuccess: () => {
      toast.success("Announcement update successful");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: () => {
      toast.error("Something wrong");
    },
  });

  console.log(id);

  console.log(data);
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      content: data?.content || "",
      title: data?.title || "",
    },
  });

  useEffect(() => {
    form.reset({
      content: data?.content || "",
      title: data?.title || "",
    });
  }, [data, form]);

  if (isPending) return <Loader />;

  return (
    <div>
      <Form {...form}>
        <form className="space-y-8">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Announcement Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your announcement"
                        className="resize-none"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            onClick={() => mutate(form.getValues())}
            isPending={isPending}
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditAnnouncement;
