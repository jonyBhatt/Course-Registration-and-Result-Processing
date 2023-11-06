import { z } from "zod";
export const assignmentSchema = z.object({
  title: z.string().min(2).max(50),
  courseName: z.string().min(2).max(50),
  description: z.string().min(4, {
    message: "Your content must be 4 characters long",
  }),
  date: z.date(),
});
