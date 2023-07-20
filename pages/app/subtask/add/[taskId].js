import Dashboard from '@/components/layout/Dashboard'
import AddSubtaskForm from '@/components/subtask/AddSubtaskForm'
import React from 'react'

function addSubtask({taskId}) {
  return (
    <Dashboard>
        <h1 className='text-3xl font-semibold mb-5'>Add Subtask</h1>
        <AddSubtaskForm taskId={taskId}></AddSubtaskForm>
    </Dashboard>
  )
}

export default addSubtask

export const getServerSideProps = async (context) => {
    const taskId = context.query.taskId;
  
    return {
      props: {
        taskId,
      },
    };
  };
  