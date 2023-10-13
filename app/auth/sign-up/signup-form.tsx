"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {toast} from 'sonner'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorHadler } from "@/lib/handleError";


const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be 2 characters long" })
    .max(50),
  email: z.string().email(),
  password: z.string().min(4),
  image_url: z.string(),
});



const RegisterForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image_url: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await axios.post("/api/register", values);
      console.log(res.data);
      form.reset();
      toast.success("Account created successfully");
      router.push('/sign-in')
    } catch (error) {
      ErrorHadler(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="john doe"
                  {...field}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-0 border-[#bed6fe] border-2 focus:border-none"
                />
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
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-0 border-[#bed6fe] border-2 focus:border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-0 border-[#bed6fe] border-2 focus:border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
