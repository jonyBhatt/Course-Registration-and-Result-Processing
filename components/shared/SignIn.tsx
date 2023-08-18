import React from "react";
import { signIn } from 'next-auth/react'
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { Button } from "../ui/button";

const SignIn = () => {
    return (
			<div className="flex flex-col gap-5 justify-center">
				<h1 className="head-text text-center">Sign In</h1>
				<Button onClick={() => signIn("google")}>
					<AiOutlineGoogle size="25px" className="text-white" />
					Continue with Google
				</Button>
				<Button onClick={() => signIn("github")}>
					<AiOutlineGithub size="25px" className="text-white" />
					Continue with Github
				</Button>
			</div>
		);
};

export default SignIn;
