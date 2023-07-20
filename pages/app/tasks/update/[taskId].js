import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import UpdateTaskForm from "@/components/task/UpdateTaskForm";

function updateTask({taskId}) {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Update Task</h1>
        <UpdateTaskForm taskId={taskId}></UpdateTaskForm>
    </Dashboard>
  );
}

export default updateTask;

export const getServerSideProps = async (context) => {
  const taskId = context.query.taskId;

  return {
    props: {
      taskId,
    },
  };
};