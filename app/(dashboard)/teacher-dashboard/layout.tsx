import React from "react";
import Header from "./_components/Header";
import LeftSideBar from "./_components/LeftSideBar";
import RightSideBar from "./_components/RightSideBar";
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="flex flex-row">
        <LeftSideBar />
        <main className="main-container">
          <div className="max-w-4xl w-full">{children}</div>
        </main>
        <RightSideBar/>
      </section>
    </>
  );
}
