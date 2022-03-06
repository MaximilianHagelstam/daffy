import axios from "axios";
import Post from "../interfaces/Post";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const getAll = async (page: number, perPage: number): Promise<Post[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}`
  );
  return data.posts;
};

const create = async (body: string): Promise<Post | null> => {
  try {
    const token = getUserToken();
    if (!token) return null;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      { body },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status !== 201) return null;

    return response.data.post;
  } catch (err) {
    return null;
  }
};

export default { getAll, create };
