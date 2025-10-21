import { findYatraById } from "@/server/actions/yatras";
import EditYatra from "../_components/EditYatra";
import React from "react";

export default async function Page({ params }) {
  console.log("params:", params);
  
  const { yatra_id: yatraId } = params;
  const response = await findYatraById(yatraId );
  console.log("blog res", response);

  const singleYatra = response?.data;

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
      <EditYatra singleYatra={singleYatra} />
    </div>
  );
}
