"use server"
import Link from "next/link";
import Image from 'next/image'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MenuProfile from "./MenuProfile";
const Header = async  () => {
	const session = await getServerSession(authOptions)
	// console.log(session);
	
	return (
		<nav className="bg-gray-400 p-4">
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
								<button>
									<Link href="/signin">Sign In</Link>
								</button>
								<button>
									<Link href="/signup">Sign Up</Link>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
