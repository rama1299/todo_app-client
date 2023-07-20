import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import ListTable from "@/components/List/ListTable";

function lists() {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Table List</h1>
      <ListTable></ListTable>
    </Dashboard>
  );
}

export default lists;
