import Provider from "@/context/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Courser Registration and Result Processing",
	description: "This is a final year project",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-[#fdfcfc]`}>
				<Provider>
					<Header />
					{children}
				</Provider>
			</body>
		</html>
	);
}
