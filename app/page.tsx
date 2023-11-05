"use client";
import Navbar from "../components/Navbar";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
