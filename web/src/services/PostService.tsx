import axios from "axios";
import Post from "../interfaces/Post";

const PostService = {
  getAll: async (limit: number): Promise<Post[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts?limit=${limit}`
    );
    return data.posts;
  },
};

export default PostService;
