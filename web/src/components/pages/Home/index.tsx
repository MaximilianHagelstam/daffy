import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../../interfaces/Post";
import PostService from "../../../services/PostService";
import PostList from "./PostList";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [postLimit, setPostLimit] = useState(5);

  const handleLoadMore = async () => {
    setPostLimit(postLimit + 5);
    const loadedPosts = await PostService.getAll(postLimit);
    const newPosts = [...posts, ...loadedPosts];
    setPosts(newPosts);
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const fetchedPosts = await PostService.getAll(postLimit);
      setPosts(fetchedPosts);
      setLoading(false);
    };

    getPosts();
  }, []);

  return (
    <>
      {loading ? <Spinner color="purple.400" /> : <PostList posts={posts} />}
      <Button
        onClick={handleLoadMore}
        isLoading={loading}
        my={4}
        colorScheme="purple"
        variant="ghost"
      >
        Load more
      </Button>
    </>
  );
};

export default Home;
