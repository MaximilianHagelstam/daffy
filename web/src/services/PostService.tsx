import axios from "axios";
import Post from "../interfaces/Post";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const PostService = {
  getAll: async (page: number, perPage: number): Promise<Post[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}`
    );
    return data.posts;
  },
  create: async (post: string): Promise<Post | null> => {
    try {
      const token = getUserToken();
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { body: post },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Error creating post");
      }

      return response.data.post;
    } catch (err) {
      return null;
    }
  },
};

export default PostService;
