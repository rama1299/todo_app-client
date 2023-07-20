import React, { useEffect, useState } from "react";
import DueDateIcon from "../task/DueDateIcon";
import Cookies from "js-cookie";
import { getTaskDetail } from "@/modules/fetchTask";
import { updateSubtaskStatus, updateSubtaskPriority, deleteSubtask } from "@/modules/fetchSubtask";
import { useRouter } from "next/router";

function SubtaskTable({ id }) {
  const [subtaskName, setSubtaskName] = useState("");
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [taskId, setTaskId] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        const response = await getTaskDetail(id);
        setSubtaskName(response.taskName);
        setSubtaskDescription(response.description)
        setSubtasks(response.Subtasks);
        setTaskId(response.id)
      };
  
      fetchData();
    }
  }, []);

  const handleCheckbox = async (id, status) => {
    try {
      let newStatus;

    if (status === 'ongoing') {
      newStatus = 'complete';
    } else if (status === 'complete') {
      newStatus = 'ongoing';
    }
      const data = {
        id,
        status: newStatus,
      }
      const response = await updateSubtaskStatus(data)
      setSubtasks(subtasks.map(subtask => {
        if (subtask.id === id) {
          return {
            ...subtask,
            status: newStatus,
          };
        }
        return subtask;
      }));
    } catch (error) {
      console.error(error)
    }
  }

  const handlePriority = async (id, isPriority) => {
    try {
      let newPriority;

    if(isPriority === false) {
      newPriority = true
    } else if (isPriority === true) {
      newPriority = false
    }

      const data = {
        id,
        isPriority: newPriority
      }
      const response = await updateSubtaskPriority(data)
      setSubtasks(subtasks.map(subtask => {
        if (subtask.id === id) {
          return {
            ...subtask,
            isPriority: newPriority,
          };
        }
        return subtask;
      }));
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteSubtask(id)
      setSubtasks((prevSubtasks) => prevSubtasks.filter((subtask) => subtask.id !== id));
    } catch (error) {
      console.error(error)
    }
  }  

  return (
    <div className="sm:px-6 w-full">
  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 shadow-md">
    <div className="sm:flex items-center justify-between">
      <div className="flex items-center">
        <div className="py-2 px-8">
          <div className="flex justify-between">
          <p className=" font-medium text-2xl">{subtaskName}</p>
          <svg onClick={()=>{router.push(`/app/tasks/update/${taskId}`)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2 text-blue-400 cursor-pointer hover:text-blue-600">
  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
</svg>

          </div>
          <p className="text-gray-400">{subtaskDescription}</p>
        </div>
      </div>
      <button
        onClick={() => {router.push(`/app/subtask/add/${taskId}`)}}
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
      >
        <p className="text-sm font-medium leading-none text-white">Add Subtask</p>
      </button>
    </div>
    <div className="mt-7 overflow-x-auto">
      {subtasks.length > 0 ? (
        <table className="w-full whitespace-nowrap">
          <tbody>
            {subtasks.map((subtask) => (
              <React.Fragment key={subtask.id}>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border-2 border-gray-100 rounded"
                >
                  <td>
                    <div className="ml-5">
                      <div className="rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        {subtask.status === 'complete' ? (
                          <svg
                            className="h-8 w-8 text-green-500 cursor-pointer"
                            onClick={() => handleCheckbox(subtask.id, subtask.status)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="9 11 12 14 20 6" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                          </svg>
                        ) : (
                          <svg
                            className="h-8 w-8 text-gray-300 cursor-pointer"
                            onClick={() => handleCheckbox(subtask.id, subtask.status)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="9 11 12 14 20 6" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center pl-5 cursor-pointer">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        {subtask.subtaskName}
                      </p>
                    </div>
                  </td>
                  <td className="pl-24">
                    <div className="flex items-center cursor-pointer" onClick={() => handlePriority(subtask.id, subtask.isPriority)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 ${subtask.isPriority === true ? 'text-gray-600' : 'text-gray-300'}`}>
                      <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                      <p className={`text-sm leading-none ${subtask.isPriority === true ? 'text-gray-600' : 'text-gray-300'} ml-2`}>Priority</p>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
                    <DueDateIcon data={subtask.dueDate} status={subtask.status} />
                  </td>
                  <td className="pl-4">
                    {subtask.status === 'ongoing' && (
                      <div className="py-3 text-center px-3 text-sm text-blue-700 bg-blue-100 focus:outline-none leading-none rounded w-36">
                        <p>Ongoing</p>
                      </div>
                    )}
                    {subtask.status === 'complete' && (
                      <div className="py-3 text-center px-3 text-sm text-green-700 bg-green-100 focus:outline-none leading-none rounded w-36">
                        <p>Complete</p>
                      </div>
                    )}
                    {subtask.status === 'overdue' && (
                      <div className="py-3 text-center px-3 text-sm text-red-700 bg-red-100 focus:outline-none leading-none rounded w-36">
                        <p>Over Due</p>
                      </div>
                    )}
                  </td>
                  <td>
                  <svg onClick={() => handleDelete(subtask.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="hover:text-gray-600 cursor-pointer ml-2 w-5 h-5 text-gray-200">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
                  </td>
                </tr>
                <tr className="h-3"></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Subtask not found</p>
      )}
    </div>
  </div>
</div>

  );
}

export default SubtaskTable;
