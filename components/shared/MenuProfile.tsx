"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from 'next/link'
import { SignOut } from ".";
interface ProfileProps {
	name: string;
	image: string;
}

const MenuProfile = ({ name, image }: ProfileProps) => {
    const [toggled, setToggled] = useState<boolean>(false)
	return (
		<>
			<div className="flex gap-2 items-center relative" onClick={()=>{setToggled((prev)=>!prev)}}>
				<Image
					src={image || ""}
					alt="PP"
					width={36}
					height={36}
					className="object-contain rounded-full cursor-pointer"
				/>
                <span className="text-sm font-extralight text-[12px]">{name}</span>
                
                {
                    toggled ? <div className="absolute  top-10 left-0 rounded-sm p-4 flex flex-col gap-4 bg-slate-600 text-white">
                        <Link href="/profile">Profile</Link>
                        <Link href="/protected/course-list">Course Lists</Link>
                        <Link href="/protected/register-course">Registered Courses</Link>
                        <Link href="/protected/cgpa">CGPA</Link>
                        <SignOut />
                    </div> : <></>
                }
			</div>
		</>
	);
};

export default MenuProfile;
