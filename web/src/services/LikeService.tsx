import axios from "axios";
import ServiceResponse from "../interfaces/ServiceResponse";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const likePost = async (postId: string): Promise<ServiceResponse<string>> => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/likes/${postId}`,
      {},
      {
        headers: {
          Authorization: `bearer ${getUserToken()}`,
        },
      }
    );

    return { isError: false, data: "Liked post" };
  } catch (err) {
    return { isError: true, errorMessage: "Error liking post" };
  }
};

const unLikePost = async (postId: string): Promise<ServiceResponse<string>> => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/likes/${postId}`, {
      headers: {
        Authorization: `bearer ${getUserToken()}`,
      },
    });

    return { isError: false, data: "Unliked post" };
  } catch (err) {
    return { isError: true, errorMessage: "Error unliking post" };
  }
};

export default { likePost, unLikePost };
