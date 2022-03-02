import axios from "axios";
import Post from "../interfaces/Post";

const PostService = {
  getAll: async (page: number, perPage: number): Promise<Post[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}`
    );
    return data.posts;
  },
};

export default PostService;
