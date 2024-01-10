import { string, z } from "zod";
export const studentSchema = z.object({
  department: z.string(),
  imageurl: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  studentId: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export const reportSchema = z.object({
  name: z.string().min(1, { message: "Name Required" }),
  id: z.string().min(1, { message: "Student Id required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  details: z.string().min(1, { message: "Details is required" }),
});
