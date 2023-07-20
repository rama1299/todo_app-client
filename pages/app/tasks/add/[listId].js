import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import AddTaskForm from "@/components/task/AddTaskForm";

function lists({listId}) {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Add Task</h1>
        <AddTaskForm listId={listId}></AddTaskForm>
    </Dashboard>
  );
}

export default lists;

export const getServerSideProps = async (context) => {
  const listId = context.query.listId;

  return {
    props: {
      listId,
    },
  };
};
