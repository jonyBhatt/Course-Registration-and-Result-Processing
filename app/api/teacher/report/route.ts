import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const body = await req.json();
  const { name, id, reason, details } = body;

  try {
    const report = await prisma.report.create({
      data: {
        name,
        s_id: id,
        reason,
        details,
        teacher: {
          connect: {
            email: user?.emailAddresses[0].emailAddress,
          },
        },
      },
    });
    return new NextResponse("Report Sent", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
