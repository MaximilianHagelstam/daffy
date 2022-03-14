import axios, { AxiosError } from "axios";
import ServiceResponse from "../interfaces/ServiceResponse";
import User from "../interfaces/User";
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from "../utils/localStorageTokenHelpers";

const getCurrentUser = async (): Promise<ServiceResponse<User>> => {
  try {
    const token = getUserToken();
    if (!token) return { isError: true, errorMessage: "Unauthenticated" };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/me`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    return { isError: false, data: data.user };
  } catch (err) {
    return { isError: true, errorMessage: "Error getting current user" };
  }
};

const register = async (
  username: string,
  password: string
): Promise<ServiceResponse<string>> => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      username: username.trim(),
      password: password.trim(),
    });

    return { isError: false, data: `Welcome ${username}` };
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      const errorMessage: string = error.response.data.error;
      const errorMessageCapitalized =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

      return { isError: true, errorMessage: errorMessageCapitalized };
    }

    return { isError: true, errorMessage: "Error registering user" };
  }
};

const login = async (
  username: string,
  password: string
): Promise<ServiceResponse<string>> => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/login`,
      {
        username: username.trim(),
        password: password.trim(),
      }
    );

    setUserToken(data.token);

    return { isError: false, data: "Logged in" };
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      const errorMessage: string = error.response.data.error;
      const errorMessageCapitalized =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

      return { isError: true, errorMessage: errorMessageCapitalized };
    }

    return { isError: true, errorMessage: "Error logging in" };
  }
};

const logout = (): void => {
  removeUserToken();
  window.location.reload();
};

export default { getCurrentUser, register, login, logout };
