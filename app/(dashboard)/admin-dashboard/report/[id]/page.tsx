"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const SingleReportDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, error, isPending } = useQuery({
    queryKey: ["singlereport"],
    queryFn: () => fetch(`/api/admin/report/${id}`).then((res) => res.json()),
  });
  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  return (
    <div className="border border-gray-300 rounded-md p-5 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Name:</h2>
          <span>{data.name}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Id:</h2>
          <span>{data.s_id}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Reason:</h2>
          <span>{data.reason}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8 items-start">
        <h2 className="font-bold text-lg">Details:</h2>
        <span>{data.details}</span>
        <Button variant={"destructive"} size={"lg"} className="mt-4 ">
          Ban User
        </Button>
      </div>
    </div>
  );
};
export default SingleReportDetails;
