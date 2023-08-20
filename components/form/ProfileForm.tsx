import { userValidation } from "@/lib/validation/user";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type SessionUserProps = {
	user?: {
		name: string;
		email: string;
		image: string;
	};
};

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

const ProfileForm = ({ user }: SessionUserProps) => {
	const [file, setFile] = useState<File[]>([])
	// console.log(user);

	const form = useForm<z.infer<typeof userValidation>>({
		resolver: zodResolver(userValidation),
		defaultValues: {
			image: user?.image || "",
			name: user?.name || "",
			email: user?.email || "",
		},
	});
	const onSubmit = async (values: z.infer<typeof userValidation>) => {
		console.log(values);
	};
	const handleImage = async (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void,
	) => {
		e.preventDefault();

		const fileReader = new FileReader();
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			setFile(Array.from(e.target.files));

			if (!file.type.includes("image")) return;
			fileReader.onload = async (event) => {
				const imgDataUrl = event.target?.result?.toString() || "";

				fieldChange(imgDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};

	return (
		<div className="bg-zinc-300 p-4 rounded-md ring-2 ring-zinc-600/[.5] shadow-md shadow-slate-500">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="cursor-pointer border  bg-transparent outline-none file:text-blue !important"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="flex items-center gap-4">
								<FormLabel className="flex h-24 w-24 items-center justify-center rounded-full  !important">
									{field.value ? (
										<>
											<Image
												src={field.value}
												alt="profile_photo"
												width={96}
												height={96}
												priority
												className="rounded-full object-contain"
											/>
										</>
									) : (
										<>
											<Image
												src="/profile.jpg"
												alt="profile_photo"
												width={24}
												height={24}
												className=" object-contain"
											/>
										</>
									)}
								</FormLabel>
								<FormControl className="flex-1 text-base-semibold text-gray-200">
									<Input
										type="file"
										accept="image/*"
										placeholder="Upload profile picture"
										className="account-form_image-input"
										//onChange={(e) => handleImage(e, field.onChange)}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="shadcn" {...field} />
								</FormControl>
								<FormDescription>
									This is your public display email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default ProfileForm;
