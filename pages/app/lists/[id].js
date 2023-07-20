import Dashboard from "@/components/layout/Dashboard";
import TaskTable from "@/components/task/TaskTable";

import React from "react";

function listDetail({ id }) {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Table Task</h1>
      <TaskTable id={id}></TaskTable>
    </Dashboard>
  );
}

export default listDetail;

export const getServerSideProps = async (context) => {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
};
