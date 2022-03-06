import axios from "axios";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const like = async (postId: string) => {
  const token = getUserToken();
  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/likes/${postId}`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
};

const unLike = async (postId: string) => {
  const token = getUserToken();
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/likes/${postId}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

const getInfo = async (
  postId: string
): Promise<{ amount: number; liked: boolean }> => {
  const token = getUserToken();
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/likes/${postId}`,
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return { amount: data.like_amount, liked: data.liked };
};

export default { like, unLike, getInfo };
