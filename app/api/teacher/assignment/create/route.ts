import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";
import { AxiosError } from "axios";
export async function POST(request: Request) {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  if (!email) return null;

  const body = await request.json();
  const { title, description, date, courseName } = body;

  if (!title || !description || !date) {
    return new Response("Please fill the require fields!");
  }

  try {
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: date,
        courseId,
      },
    });
    console.log(assignment);

    return new Response("Assignment created", { status: 201 });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
    return new Response("Something wrong", { status: 500 });
  }
}
