"use server";
import prisma from "../db/connectDB";
import * as z from "zod";
import { assignmentSchema } from "../validation/assignmentValidation";

type AssignmentType = z.infer<typeof assignmentSchema>;

export const updateAssignment = async (values: AssignmentType, id: string) => {
  try {
    await prisma.assignment.update({
      where: {
        id,
      },
      data: {
        courseName: values.courseName,
        description: values.description,
        title: values.title,
        dueDate: String(values.date),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
