import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../../interfaces/Post";
import PostService from "../../../services/PostService";
import PostList from "./PostList";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [postLimit, setPostLimit] = useState(5);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const fetchedPosts = await PostService.getAll(postLimit);

      setPosts(fetchedPosts);
      setLoading(false);
    };

    getPosts();
  }, [postLimit]);

  return (
    <>
      {loading ? <Spinner color="purple.400" /> : <PostList posts={posts} />}
      <Button
        onClick={() => {
          setPostLimit(postLimit + 5);
        }}
        isLoading={loading}
      >
        Load more
      </Button>
    </>
  );
};

export default Home;
