import { useState } from "react";
import { addTask } from "@/modules/fetchTask";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddTaskForm = ({listId}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(false);
  const router = useRouter()

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.checked);
  };

  const handleSubmit = async (e) => {
      e.preventDefault()
      const data = {
        listId,
        taskName,
        description,
        dueDate,
        isPriority: priority,
      }
    try {
        const response = await addTask(data)
        toast.success(response.message, {autoClose: 2000})
        router.push(`/app/lists/${listId}`)
    } catch (error) {
        console.log(error)
        toast.error(error.message, {autoClose: 2000})
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={handleTaskNameChange}
          className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          min={today}
          onChange={handleDueDateChange}
          className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center text-gray-700 font-bold">
          <input
            type="checkbox"
            checked={priority}
            onChange={handlePriorityChange}
            className="form-checkbox mr-2"
          />
          Priority
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
