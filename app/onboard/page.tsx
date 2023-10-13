import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Onboard = () => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="border shadow-md backdrop-blur-sm shadow-slate-600 border-gray-500 p-6 rounded-md md:max-w-xl w-full sm:max-w-l xs:max-w-sm">
        <h1 className="font-bold md:text-4xl xs:text-3xl">Welcome to CRRP,</h1>
        <p className="text-sm font-light text-gray-700">
          Please confirm your identification
        </p>
        <div className="flex items-center gap-4 my-7">
          <Button variant="outline">
            <Link href="/student-dashboard">Student</Link>
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
