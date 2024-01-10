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
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateAnnouncement = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof announcementSchema>) =>
      await axios.post(`/api/teacher/announcement/${id}`, values),
    onSuccess: () => {
      toast.success("Announcement create successful");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: () => {
      toast.error("Something wrong");
    },
  });
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAnnouncement;
