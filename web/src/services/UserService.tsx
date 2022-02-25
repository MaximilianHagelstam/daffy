import axios from "axios";
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
  register: async (username: string, password: string): Promise<User> => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/users/current`,
      {
        username,
        password,
      }
    );
    return data.user;
  },
};

export default UserService;
