import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import PostService from "../../services/PostService";
import PostList from "./PostList";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const fetchedPosts = await PostService.getAll(page, 10);

      if (fetchedPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      }

      setLoading(false);
    };

    getPosts();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <>
      <PostList posts={posts} />
      {loading ? <Spinner color="purple.400" /> : null}
    </>
  );
};

export default Home;
