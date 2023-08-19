import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "@/lib/connecDb";
import { getUserByEmail, signInWithOauth } from "../../(utils)/utils";
ConnectDB();
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }: any) {
			// console.log({account, profile})
			if (account.type === "oauth") {
				return await signInWithOauth({ account, profile });
			}
			return true;
		},
		async session({ session, user, token }: any) {
			// console.log({session, token});
			session.user = token.user;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }: any) {
			const users = await getUserByEmail(token.email)
			// console.log({users});
			// console.log(email);
			token.user = users		
			
			return token;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Utils
