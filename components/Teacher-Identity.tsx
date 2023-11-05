"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import axios from "axios";
interface User {
  user: {
    id: string;
    imageurl: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

const formSchema = z.object({
  position: z.string().min(2).max(50),
  department: z.string(),
  imageurl: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
});

const TeacherIdentityForm = ({ user }: User) => {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      department: "",
      imageurl: user?.imageurl || "",
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const res = await axios.post("/api/onboard/teacher-onboard", values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    push("/teacher-dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="your first name"
                  {...field}
                  className="w-full"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="your last name" {...field} />
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
                <Input type="email" placeholder="your@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Your position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="departmenthead">
                    Department Head
                  </SelectItem>
                  <SelectItem value="professor">Professor </SelectItem>
                  <SelectItem value="associateprofessor">
                    Associate Professor
                  </SelectItem>
                  <SelectItem value="assistantprofessor">
                    Assistant Professor
                  </SelectItem>
                  <SelectItem value="lecturer">Lecturer</SelectItem>
                  <SelectItem value="visitingprofessor">
                    Visiting Professor
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CSE">
                    Computer Science and Engineering
                  </SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="LAW">LAW</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
};

export default TeacherIdentityForm;
