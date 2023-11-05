import prisma from "@/lib/db/connectDB";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const user = await currentUser();
  const body = await request.json();
  const { firstname, lastname, imageurl, department, position, email } = body;

  try {
    const teacher = await prisma.teacher.create({
      data: {
        email,
        firstname,
        lastname,
        position,
        department,
        imageurl,
      },
    });
    console.log(teacher);
    await prisma.user.create({
      data: {
        onboarded: true,
        name: firstname,
        role: "TEACHER",
        department,
        image_url: user?.imageUrl,
        email:user?.emailAddresses[0].emailAddress!
      },
    });
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in teacher onboard ${error.message}`);
    }
  }
}

export async function GET() {
  const user = await currentUser();
  const onBoardUser = await prisma.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (!onBoardUser) {
    return null;
  }

  if (onBoardUser?.onboarded) {
    if (onBoardUser?.role === "TEACHER") {
      return Response.redirect("/teacher-dashboard");
    } else if (onBoardUser.role === "STUDENT") {
      return Response.redirect("/student-dashboard");
    } else {
      return Response.redirect("/admin");
    }
  } else {
    return Response.redirect("/onboard");
  }
}
