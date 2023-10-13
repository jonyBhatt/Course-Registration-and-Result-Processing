import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  const user = await currentUser();
  const courses = await prisma.course.findMany({
    where: {
      teacherEmail:user?.emailAddresses[0].emailAddress
    },
  });

  if (!courses) {
    return Response.json("No courses yet");
  }

  return Response.json({ success: true, courses }, { status: 200 });
}
