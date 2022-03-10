import axios from "axios";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const likePost = async (postId: string): Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/likes/${postId}`,
    {},
    {
      headers: {
        Authorization: `bearer ${getUserToken()}`,
      },
    }
  );
};

const unLikePost = async (postId: string): Promise<void> => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/likes/${postId}`, {
    headers: {
      Authorization: `bearer ${getUserToken()}`,
    },
  });
};

export default { likePost, unLikePost };
