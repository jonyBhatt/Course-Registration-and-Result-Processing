import React from "react";
import { Header, LeftSideBar, RightSideBar } from "./_components/layout";

export default function StudentLayout({
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
        <RightSideBar />
      </section>
    </>
  );
}
