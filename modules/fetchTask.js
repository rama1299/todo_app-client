import Cookies from "js-cookie";
import { instance } from "./axios/instance";

const getTasks = async (id) => {
    try {
      const response = await instance.get(`/api/tasks`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

const updateTaskStatus = async (data) => {
  try {
    const { id, status } = data
    const response = await instance.put(`/api/tasks/status/${id}`, {
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

const updateTaskPriority = async (data) => {
    try {
      const id = data.id
      const isPriority = data.isPriority
      const response = await instance.put(`/api/tasks/priority/${id}`, {
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

  const updateTask = async (data) => {
    try {
      const {taskId, taskName, description, dueDate} = data
      const response = await instance.put(`/api/tasks/${taskId}`, {
          taskName, description, dueDate
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

  const getTaskDetail = async (id) => {
    try {
      const response = await instance.get(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  const addTask = async (data) => {
    try {
      const {listId, taskName, description, dueDate, isPriority} = data
      const response = await instance.post(`/api/tasks/${listId}`, {
          taskName,
          description,
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

  const deleteTask = async (id) => {
    try {
      const response = await instance.delete(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

export { updateTaskStatus, updateTaskPriority, getTaskDetail, getTasks, addTask, deleteTask, updateTask };
