import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import TodayTaskTable from "@/components/today/TodayTaskTable";


function today() {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Task Today</h1>
      <TodayTaskTable></TodayTaskTable>
    </Dashboard>
  );
}

export default today;
