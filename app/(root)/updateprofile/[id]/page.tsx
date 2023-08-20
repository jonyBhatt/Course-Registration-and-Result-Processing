"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { ProfileComponent } from "@/components/shared";
import ProfileForm from "@/components/form/ProfileForm";
import {Session} from 'next-auth'
const Page = () => {
	const { data: session, status } = useSession();
	// console.log(status);
	// console.log(session);

	return (
		<div className="flex items-center justify-center h-screen">
			{status === "loading" ? (
				<>
					<p className="text-center">Loading...</p>
				</>
			) : (
          <>
            <ProfileForm user={session?.user} />
          </>
			)}
		</div>
	);
};

export default Page;
