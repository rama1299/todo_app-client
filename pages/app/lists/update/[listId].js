import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import UpdateListForm from "@/components/List/UpdateListForm";

function lists({listId}) {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Update List</h1>
        <UpdateListForm listId={listId}></UpdateListForm>
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
