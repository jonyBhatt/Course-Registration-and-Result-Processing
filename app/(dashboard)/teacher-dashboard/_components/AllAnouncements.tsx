"use client";
import React, { useEffect, useState } from "react";
import { signal, effect } from "@preact/signals-react";
import axios from "axios";
import { columns } from "@/components/DataTable/cloumn";
import { DataTable } from "@/components/DataTable/data-table";

const AllAnnouncements = ({ id }: { id: string }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`/api/teacher/announcement/${id}`);
      console.log(res.data);
      setData(res.data);
    };

    getData();
  }, [id]);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AllAnnouncements;
