"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";

const Settings = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetch("/api/profile").then((res) => res.json()),
  });
  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="my-6 font-bold text-3xl">Settings</h2>
        <Link
          href={`/admin-dashboard/settings/${data.id}`}
          className="text-blue-500 font-semibold"
        >
          Edit your profile
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">Profile picture:</h3>
          {data.image_url ? (
            <>
              <Image
                src={data.image_url}
                alt="user"
                width={80}
                height={80}
                className="object-cover rounded-full"
              />
            </>
          ) : (
            <>
              <Image
                src="/image/user.jpg"
                alt="user"
                width={80}
                height={80}
                className="object-cover rounded-full"
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-bold text-xl">Name:</h2>
            <span className="text-gray-400 text-lg">{data.name}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="font-bold text-xl">Email:</h2>
            <span className="text-gray-400 text-lg">{data.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
