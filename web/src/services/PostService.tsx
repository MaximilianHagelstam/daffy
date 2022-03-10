import axios from "axios";
import Post from "../interfaces/Post";
import ServiceResponse from "../interfaces/ServiceResponse";
import { getUserToken } from "../utils/localStorageTokenHelpers";

const getAll = async (page: number, perPage: number): Promise<Post[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}`
  );
  return data.posts;
};

const getByNewest = async (page: number, perPage: number): Promise<Post[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}&sortBy=newest`
  );
  return data.posts;
};

const getByOldest = async (page: number, perPage: number): Promise<Post[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}&sortBy=oldest`
  );
  return data.posts;
};

const getByPopular = async (page: number, perPage: number): Promise<Post[]> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts?page=${page}&perPage=${perPage}&sortBy=popular`
  );
  return data.posts;
};

const create = async (body: string): Promise<ServiceResponse<string>> => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      { body },
      {
        headers: {
          Authorization: `bearer ${getUserToken()}`,
        },
      }
    );

    return { isError: false, data: "Created post" };
  } catch (err) {
    return { isError: true, errorMessage: "Error creating post" };
  }
};

const remove = async (postId: string): Promise<ServiceResponse<string>> => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, {
      headers: {
        Authorization: `bearer ${getUserToken()}`,
      },
    });

    return { isError: false, data: "Deleted post" };
  } catch (err) {
    return { isError: true, errorMessage: "Error removing post" };
  }
};

const getLiked = async (page: number, perPage: number): Promise<Post[]> => {
  const token = getUserToken();
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/posts/liked?page=${page}&perPage=${perPage}`,
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data.posts;
};

export default {
  getAll,
  create,
  remove,
  getLiked,
  getByNewest,
  getByOldest,
  getByPopular,
};
