import { UseToastOptions } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import User from "../interfaces/User";

const UserService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/current`
      );
      return data;
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
        username,
        password,
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
};

export default UserService;
