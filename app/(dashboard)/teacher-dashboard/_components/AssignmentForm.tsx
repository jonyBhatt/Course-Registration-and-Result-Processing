"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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


const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(4, {
    message: "Your content must be 4 characters long",
  }),
  date: z.date()
});

const AssignmentForm = () => {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add your Assignments</DialogTitle>
      </DialogHeader>
    </div>
  );
};

export default AssignmentForm;
