"use client";
import { LeftBar } from "@/constants/AdminLeftBar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const path = usePathname();

  return (
    <aside className=" sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r bg-[#D7F5EA] pb-4  max-md:hidden;">
      <div className="flex flex-1  flex-col gap-6  px-6 w-full py-8">
        {LeftBar.map((item) => {
          return (
            <Link
              href={item.route}
              key={item.label}
              className={`relative cursor-pointer flex justify-start gap-4 rounded-lg p-4 transition-all duration-150 ease-in-out hover:bg-gray-50 ${
                path === item.route ? "bg-gray-50" : ""
              }`}
            >
              <Image src={item.imageUrl} alt="img" width={30} height={30} />
              <p className="max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default LeftSideBar;

/**
 * 
 * {LeftBar.map((item) => (
          <Link href={item.route} key={item.label} className="max-h-screen">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src={item.imageUrl}
                  alt="image"
                  fill
                  className="rounded-full"
                />
              </div>
              <h6>{item.label}</h6>
            </div>
          </Link>
        ))}
 */
