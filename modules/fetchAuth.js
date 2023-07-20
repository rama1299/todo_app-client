import { instance } from "./axios/instance";

const registerAuth = async (data) => {
  try {
    const { username, email, password } = data;
    const response = await instance.post("/api/register", {
      username,
      email,
      password,
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

const loginAuth = async (data) => {
  try {
    const { email, password } = data;
    const response = await instance.post("/api/login", {
      email,
      password,
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

const forgotPasswordAuth = async (data) => {
  try {
    const { email, password } = data;
    const response = await instance.put("/api/forgot-password", {
      email,
      newPassword: password,
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
export { registerAuth, loginAuth, forgotPasswordAuth };
