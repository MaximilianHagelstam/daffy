import { UseToastOptions } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import User from "../interfaces/User";
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from "../utils/localStorageTokenHelpers";

const UserService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = getUserToken();
      if (!token) {
        return null;
      }

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/current`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      return data.user;
    } catch (err) {
      return null;
    }
  },
  register: async (
    username: string,
    password: string
  ): Promise<UseToastOptions> => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        username: username.trim(),
        password: password.trim(),
      });
      return { title: `Registered user "${username}"`, status: "success" };
    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        const errorMessage: string = error.response.data.error;
        const errorMessageCapitalized =
          errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

        return { title: errorMessageCapitalized, status: "error" };
      }

      return { title: "Could not register user", status: "error" };
    }
  },
  login: async (
    username: string,
    password: string
  ): Promise<{ message: string; error: boolean }> => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      setUserToken(data.token);

      return { message: "Logged in", error: false };
    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        const errorMessage: string = error.response.data.error;
        const errorMessageCapitalized =
          errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

        return { message: errorMessageCapitalized, error: true };
      }

      return { message: "Could not log in", error: true };
    }
  },
  logout: (): void => {
    removeUserToken();
    window.location.reload();
  },
};

export default UserService;
