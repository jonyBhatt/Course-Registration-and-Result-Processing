import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/connectDB";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
const Onboard = async () => {
  // const { push } = useRouter();
  const cUser = await currentUser();
  if (!cUser) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: cUser?.emailAddresses[0].emailAddress,
    },
  });
  if (user?.onboarded === false) return redirect("/onboard");
  if (user?.role === "TEACHER") {
    return redirect("/teacher-dashboard")
  } else if (user?.role === "STUDENT") {
    return redirect("/student-dashboard")
  }
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="border shadow-md backdrop-blur-sm shadow-slate-600 border-gray-500 p-6 rounded-md md:max-w-xl w-full sm:max-w-l xs:max-w-sm">
        <h1 className="font-bold md:text-4xl xs:text-3xl">Welcome to CRRP,</h1>
        <p className="text-sm font-light text-gray-700">
          Please confirm your identification
        </p>
        <div className="flex items-center gap-4 my-7">
          <Button variant="outline">
            <Link href="/student-identity">Student</Link>
          </Button>
          <Button variant="destructive">
            <Link href="/teacher-identity">Teacher</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
