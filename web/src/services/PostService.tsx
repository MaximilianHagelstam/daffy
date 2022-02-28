import axios from "axios";
import Post from "../interfaces/Post";

const PostService = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts`
    );
    return data.posts;
  },
};

export default PostService;
