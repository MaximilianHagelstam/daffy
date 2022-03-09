import axios from "axios";
import Post from "../interfaces/Post";
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

const remove = async (postId: string): Promise<{ error: boolean }> => {
  try {
    const token = getUserToken();
    if (!token) return { error: true };

    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status !== 204) return { error: true };

    return { error: false };
  } catch (err) {
    return { error: true };
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
