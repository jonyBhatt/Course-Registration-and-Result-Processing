import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-4 flex justify-between items-center shadow-md shadow-gray-300 py-4 bg-[#eaeaee]">
      <div className="w-12 h-12 relative">
        <Link href="/teacher-dashboard">
          <Image
            src="/image/logo.jpeg"
            alt="logo"
            fill
            className="rounded-full"
          />
        </Link>
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
};

export default Header;
