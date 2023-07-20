import Cookies from "js-cookie";
import { instance } from "./axios/instance";

const updateSubtaskStatus = async (data) => {
  try {
    const { id, status } = data
    const response = await instance.put(`/api/subtasks/status/${id}`, {
        status
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const updateSubtaskPriority = async (data) => {
    try {
      const id = data.id
      const isPriority = data.isPriority
      const response = await instance.put(`/api/subtasks/priority/${id}`, {
          isPriority
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  const addSubtask = async (data) => {
    try {
      const {taskId, subtaskName, dueDate, isPriority} = data
      const response = await instance.post(`/api/subtasks/${taskId}`, {
          subtaskName,
          dueDate,
          isPriority,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  const deleteSubtask = async (id) => {
    try {
      const response = await instance.delete(`/api/subtasks/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  export {updateSubtaskPriority, updateSubtaskStatus, addSubtask, deleteSubtask}