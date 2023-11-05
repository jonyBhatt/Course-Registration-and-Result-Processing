import { z } from "zod";

export const announcementSchema = z.object({
  courseName: z.string().min(1, { message: "You have to provide course name" }),
  title: z
    .string()
    .min(1, { message: "Title must be at least 3 characters long" }),
  content: z
    .string()
    .min(1, { message: "You have to describe what is about the announcement" }),
});
