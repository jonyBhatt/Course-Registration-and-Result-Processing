"use server"
import Link from "next/link";
import Image from 'next/image'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MenuProfile from "./MenuProfile";
import { Button } from "../ui/button";
const Header = async  () => {
	const session = await getServerSession(authOptions)
	// console.log(session);
	
	return (
		<nav className=" py-4 border-b border-borderColor">
			<div className="container mx-auto">
				{/* Desktop Version	*/}
				<div className="flex justify-between items-center">
					{/* Logo & Search */}
					<div className="flex items-center gap-2">
						<Link href="/">
							<p className="head-text">Logo</p>
						</Link>

						<span>Search</span>
					</div>
					{session ? (
						<>
							<MenuProfile
								name={session?.user?.name || "John Doe"}
								image={
									session?.user?.image ||
									"https://xsgames.co/randomusers/avatar.php?g=male"
								}
							/>
						</>
					) : (
						<>
							<div className="flex items-center gap-3">
								<Button>
									<Link href="/signin">Sign In</Link>
								</Button>
								<Button variant={"secondary"}>
									<Link href="/signup">Sign Up</Link>
								</Button>
								<Link href="/dashboard">Dashboard</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
