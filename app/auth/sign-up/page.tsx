import React from "react";
import RegisterForm from "./signup-form";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="relative w-16 h-16 mb-8">
        <Image src="/logo.svg" alt="logo" fill />
      </div>
      <div className="my-5 p-2 rounded-full bg-white ring-1 ring-[#bed6fe] max-w-sm w-full shadow-md hover:shadow-lg shadow-gray-500">
        <p className="font-bold text-sm text-center">
          Register with your information
        </p>
      </div>
      <div className="max-w-md w-full p-4 rounded shadow-md ring-1 ring-[#bed6fe">
        <RegisterForm />
      </div>
    </div>
  );
};

export default SignUp;
