import { instance } from "./axios/instance";

const addComment = async (data) => {
    try {
      const {taskId, commentText} = data
      const response = await instance.post(`/api/task-comment/${taskId}`, {
        commentText
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

  const deleteComment = async (id) => {
    try {
      const response = await instance.delete(`/api/task-comment/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  };

  export {addComment, deleteComment}