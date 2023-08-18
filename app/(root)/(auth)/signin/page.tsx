"use client";
import React from "react";
import Image from "next/image";
import { SignIn } from "@/components/shared";

const Page = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-gray-500 p-4 rounded-md flex items-center gap-4">
				<Image
					src={"/undraw_secure_login_pdn4.svg"}
					alt="Login"
					width={120}
					height={120}
					className="object-cover "
				/>
				<SignIn />
			</div>
		</div>
	);
};

export default Page;
