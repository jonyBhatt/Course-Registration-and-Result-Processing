"use client";
import React, { useEffect, useState } from "react";
import { signal, effect } from "@preact/signals-react";
import axios from "axios";
import { columns } from "@/components/DataTable/cloumn";
import { DataTable } from "@/components/DataTable/data-table";

const AllAnnouncements = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get("/api/teacher/announcement");
      console.log(res.data);
      setData(res.data);
    };

    getData();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AllAnnouncements;
