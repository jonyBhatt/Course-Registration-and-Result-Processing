import React from "react";
import Header from "../student-dashboard/_components/layout/Header";
import LeftSideBar from "./_components/LeftSideBar";
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header />
      <div className=" flex  overflow-hidden">
        <LeftSideBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
