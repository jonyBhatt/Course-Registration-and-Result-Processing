import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return null;
  const body = await request.json();
  const { courseName, title, content } = body;
  if (!courseName || !title || !content) {
    return new Response("Missing required fields", { status: 400 });
  }
  try {
    const announcement = await prisma.teacher.update({
      where: { email: user.emailAddresses[0].emailAddress },
      data: {
        announcements: {
          create: {
            courseName,
            title,
            content,
          },
        },
      },
    });
    console.log("announcement created", announcement);
    return new Response(`Announcement added successfully`, { status: 201 });
  } catch (error) {
    console.log("Error creating announcement", error);
    return new Response(`Failed to add announcement`, { status: 500 });
  }
}
