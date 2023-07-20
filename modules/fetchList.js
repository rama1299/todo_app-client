import Cookies from "js-cookie";
import { instance } from "./axios/instance";

const getList = async () => {
  try {
    const response = await instance.get("/api/lists");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const getListFavorite = async () => {
  try {
    const response = await instance.get("/api/lists/Favorites");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const getListDetail = async (id) => {
  try {
    const response = await instance.get(`/api/lists/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const updateList = async (data) => {
  try {
    const {listId, listName, color} = data
    const response = await instance.put(`/api/lists/${listId}`, {
        listName,
        color
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

const updateListFavorite = async (data) => {
  try {
    const id = data.id
    const isFavorites = data.isFavorites
    const response = await instance.put(`/api/lists/favorites/${id}`, {
        isFavorites
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

const addList = async (data) => {
  try {
    const {listName, color, isFavorites} = data
    const response = await instance.post(`/api/lists`, {
        listName,
        color,
        isFavorites,
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

const deleteList = async (id) => {
  try {
    const response = await instance.delete(`/api/lists/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export { getList, getListFavorite, getListDetail, updateListFavorite, addList, deleteList, updateList };
