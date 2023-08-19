"use client";
import React from "react";
import Image from "next/image";
import { SignIn } from "@/components/shared";
interface Props{
	searchParams:string
}

const Page = () => {
	
	
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="bg-[#ebeaeb] p-2.5 rounded-md flex  gap-4 ">
				<Image
					src={"/undraw_secure_login_pdn4.svg"}
					alt="Login"
					width={300}
					height={300}
					className="object-cover "
				/>
				<SignIn  />
			</div>
		</div>
	);
};

export default Page;
