"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
const FetchUser = () => {
  const queryClient = useQueryClient();
  const { data, error, isPending } = useQuery({
    queryKey: ["allusers"],
    queryFn: () => fetch("/api/admin/user").then((res) => res.json()),
  });

  const { mutate } = useMutation({
    mutationKey: ["banUser"],
    mutationFn: (id: string) =>
      fetch(`/api/admin/user/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Ban user");
      queryClient.invalidateQueries({ queryKey: ["banUser"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const handleBan = (id: string) => {
    mutate(id);
  };
  if (isPending) return <Loader />;
  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Roles</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ctx) => (
            <TableRow key={ctx.id}>
              <TableCell className="font-medium">{ctx.id}</TableCell>
              <TableCell>{ctx.name}</TableCell>
              <TableCell>
                {ctx.image_url ? (
                  <>
                    <Image
                      src={ctx.image_url}
                      alt="user profile"
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src="/image/user.jpg"
                      alt="user profile"
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  </>
                )}
              </TableCell>
              <TableCell className="text-center">{ctx.email}</TableCell>
              <TableCell className="text-center">{ctx.role}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  size={"lg"}
                  onClick={() => handleBan(ctx.id)}
                >
                  Ban
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FetchUser;
