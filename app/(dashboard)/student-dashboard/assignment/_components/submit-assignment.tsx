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
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  submission: z.string(),
});

const SubmitAssignment = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) =>
      await axios.post(`/api/student/assignment/${id}`, values),
    onSuccess: () => {
      toast.success("Announcement create successful");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
    onError: () => {
      toast.error("Something wrong");
    },
  });
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Call the mutate function with the form data
    mutate(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      submission: "",
    },
  });
  return (
    <Form {...form}>
      <form
        action=""
        className="space-y-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="submission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submit Assignment</FormLabel>
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
        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubmitAssignment;
