import { Button, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../../interfaces/Post";
import PostService from "../../../services/PostService";
import PostView from "./PostView";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const fetchedPosts = await PostService.getAll(page, 5);
      setPosts((prev) => [...prev, ...fetchedPosts]);
      setLoading(false);
    };

    getPosts();
  }, [page]);

  return (
    <>
      {loading ? (
        <Spinner color="purple.400" />
      ) : (
        <Stack spacing={4}>
          {posts.map((post) => (
            <PostView key={post.id} post={post} />
          ))}
        </Stack>
      )}
      <Button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
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
