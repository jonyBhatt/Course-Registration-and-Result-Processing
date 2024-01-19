"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ReportsDetails = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["allreport"],
    queryFn: () => fetch("/api/admin/report").then((res) => res.json()),
  });
  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <div>
      {data.map((ctx: any) => (
        <div key={ctx.id}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg">Name:</h2>
              <span>{ctx.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg">Id:</h2>
              <span>{ctx.s_id}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-lg">Reason:</h2>
              <span>{ctx.reason}</span>
            </div>
          </div>
          <Link href={`/admin-dashboard/report/${ctx.id}`}>
            <Button className="mt-6" size="lg">
              View
            </Button>
          </Link>
        </div>
      ))}

      {/* <div className="flex flex-col gap-2 mt-8 items-start">
        <h2 className="font-bold text-lg">Details:</h2>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cupiditate
          veritatis consectetur officia hic provident voluptas nostrum, velit
          temporibus, neque fugiat illum iure. Illo beatae fugiat sunt aliquid.
          Accusamus, quas?
        </span>
        <Button variant={"destructive"} size={"lg"} className="mt-4 ">
          Ban User
        </Button>
      </div> */}
    </div>
  );
};
export default ReportsDetails;
