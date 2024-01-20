import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await currentUser();

  const body = await req.json();
  const { title, content } = body;

  if (!user) return null;

  try {
    const newAnnounce = await prisma.announcement.create({
      data: {
        title,
        content,
        course: {
          connect: {
            id,
          },
        },
        teacher: {
          connect: {
            email: user?.emailAddresses[0].emailAddress,
          },
        },
      },
    });

    return new NextResponse("Announcement created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error creating announcement", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const announcements = await prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    //return error
    console.log("Error in getAnnouncements", error);
    return new Response("Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await currentUser();

  const body = await req.json();
  const { title, content } = body;

  if (!user) return null;

  try {
    await prisma.announcement.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return new NextResponse("Announcement created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error creating announcement", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.announcement.delete({
      where: {
        id,
      },
    });
    return NextResponse.json("Delete", { status: 200 });
  } catch (error) {
    console.log("Error in getAnnouncements", error);
    return new Response("Server Error", { status: 500 });
  }
}
