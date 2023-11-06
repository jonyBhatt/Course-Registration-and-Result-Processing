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
