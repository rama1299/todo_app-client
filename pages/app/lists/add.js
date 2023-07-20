import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import AddListForm from "@/components/List/AddListForm";

function add() {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Add List</h1>
      <AddListForm></AddListForm>
    </Dashboard>
  );
}

export default add;