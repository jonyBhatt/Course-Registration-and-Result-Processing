import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import { signOut } from "next-auth/react";
import Modal from "./Modal";

const Navbar = async () => {

  return (
    <nav className="py-5 shadow-md dark:shadow-slate-600">
      <div className="container mx-auto sm:px-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-4xl sm:text-xl">
            <Link href="/">Logo</Link>
          </h1>
          <div className="flex items-center gap-3">
            <Button>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button variant="outline">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
