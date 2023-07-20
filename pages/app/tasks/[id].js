import React from 'react'
import Dashboard from '@/components/layout/Dashboard'
import SubtaskTable from '@/components/subtask/SubtaskTable'

function taskDetail
({id}) {
  return (
    <Dashboard>
      <h1 className='text-3xl font-semibold mb-5'>Table Subtask</h1>
        <SubtaskTable id={id}></SubtaskTable>
    </Dashboard>
  )
}

export default taskDetail

export const getServerSideProps = async (context) => {
    const id = context.query.id;
  
    return {
      props: {
        id,
      },
    };
  };
  