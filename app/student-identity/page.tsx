import StudentIdentityForm from "@/components/student-identity-form";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const StudentIdentity = async () => {
  const user = await currentUser();
  //   console.log(user);

  const userData = {
    id: user?.id || "",
    imageurl: user?.imageUrl || "",
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    email: user?.emailAddresses[0].emailAddress || "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center my-4 ">
      <div className="border shadow-md backdrop-blur-sm shadow-slate-600 border-gray-500 p-6 rounded-md md:max-w-xl w-full sm:max-w-l xs:max-w-sm">
        <h1 className="font-bold md:text-4xl xs:text-3xl">Welcome to CRRP,</h1>
        <p className="text-sm font-light text-gray-700">
          Please fill up these information
        </p>
        <div className=" my-7 w-full">
          <StudentIdentityForm user={userData} />
        </div>
      </div>
    </div>
  );
};

export default StudentIdentity;
