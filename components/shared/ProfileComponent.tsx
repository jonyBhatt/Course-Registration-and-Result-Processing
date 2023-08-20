"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
interface SessionProps{
    name: string,
    email: string,
    image: string,
    role:string
}
const ProfileComponent = ({user}:any) => {
    console.log(user);
    
    
  return (
		<div className="flex flex-col w-full">
			{/* Image */}
			<div className="image-container ">
				<div className="relative flex justify-center items-center">
					<Image
						src={user.image}
						alt="pp"
						width={100}
						height={100}
						className="object-cover absolute top-[140px] rounded-full"
					/>
				</div>
			</div>

			{/* Details */}
			<div className="flex flex-col gap-6   container mx-auto pt-16 px-24 ">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-base text-center">Name:</h3>
					<span className="font-bold text-base">{user.name}</span>
				</div>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-base">Email:</h3>
					<span className="font-bold text-xs text-center">{user.email}</span>
				</div>
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-base">Role:</h3>
					<span className="font-bold text-base">{user.role}</span>
				</div>
		  </div>
		  <Button>
			  <Link href={`/updateprofile/${user._id}`}>Update Profile</Link>
		  </Button>
		</div>
	);
}

export default ProfileComponent