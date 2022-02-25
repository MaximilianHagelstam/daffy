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
};

export default UserService;
