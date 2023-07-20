import React, { useEffect, useState } from "react";

import SubtaskIcon from "../task/SubtaskIcon";
import CommentIcon from "../task/CommentIcon";
import DueDateIcon from "../task/DueDateIcon";
import { getTasks } from "@/modules/fetchTask";
import { updateTaskStatus, updateTaskPriority } from "@/modules/fetchTask";
import { useRouter } from "next/router";

function TodayTaskTable({ id }) {
  const [tasks, setTasks] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        const response = await getTasks(id);
        setTasks(response);
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
      const response = await updateTaskStatus(data)
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
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
      const response = await updateTaskPriority(data)
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            isPriority: newPriority,
          };
        }
        return task;
      }));
    } catch (error) {
      console.error(error)
    }
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, maka perlu ditambahkan 1
  const day = String(today.getDate()).padStart(2, '0');

  const formattedToday = `${year}-${month}-${day}`;

  const tasksToday = tasks.filter((task) => task.dueDate > formattedToday);

  return (
    <div className="sm:px-6 w-full">
  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 shadow-md">
    <div className=" overflow-x-auto">
      {tasksToday.length > 0 ? (
        <table className="w-full whitespace-nowrap">
          <tbody>
            {tasksToday.map((task) => (
              <React.Fragment key={task.id}>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border-2 border-gray-100 rounded"
                >
                  <td>
                    <div className="ml-5">
                      <div className="rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                        {task.status === 'complete' ? (
                          <svg
                            className="h-8 w-8 text-green-500 cursor-pointer"
                            onClick={() => handleCheckbox(task.id, task.status)}
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
                            onClick={() => handleCheckbox(task.id, task.status)}
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
                    <div className="flex items-center pl-5 cursor-pointer" onClick={()=>{router.push(`/app/tasks/${task.id}`)}}>
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        {task.taskName}
                      </p>
                    </div>
                  </td>
                  <td className="pl-24">
                    <div className="flex items-center cursor-pointer" onClick={() => handlePriority(task.id, task.isPriority)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 ${task.isPriority === true ? 'text-gray-600' : 'text-gray-300'}`}>
                      <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                      <p className={`text-sm leading-none ${task.isPriority === true ? 'text-gray-600' : 'text-gray-300'} ml-2`}>Priority</p>
                    </div>
                  </td>
                  <td>
                    <SubtaskIcon data={task.Subtasks} />
                  </td>
                  <td>
                    <CommentIcon data={task.TaskComments} />
                  </td>
                  <td>
                    <DueDateIcon data={task.dueDate} status={task.status} />
                  </td>
                  <td className="pl-4">
                    {task.status === 'ongoing' && (
                      <div className="py-3 text-center px-3 text-sm text-blue-700 bg-blue-100 focus:outline-none leading-none rounded w-36">
                        <p>Ongoing</p>
                      </div>
                    )}
                    {task.status === 'complete' && (
                      <div className="py-3 text-center px-3 text-sm text-green-700 bg-green-100 focus:outline-none leading-none rounded w-36">
                        <p>Complete</p>
                      </div>
                    )}
                    {task.status === 'overdue' && (
                      <div className="py-3 text-center px-3 text-sm text-red-700 bg-red-100 focus:outline-none leading-none rounded w-36">
                        <p>Over Due</p>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="h-3"></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  </div>
</div>

  );
}

export default TodayTaskTable;
