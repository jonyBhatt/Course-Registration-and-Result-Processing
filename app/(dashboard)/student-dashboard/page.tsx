import { UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-between">
      {" "}
      Student Dashboard
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
