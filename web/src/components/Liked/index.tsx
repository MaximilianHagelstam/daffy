import { Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import PostService from "../../services/PostService";
import PostCard from "../PostCard";

const Liked = () => {
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
      if (!hasMore) return;

      const fetchedPosts = await PostService.getLiked(page, 20);

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
      <Stack spacing={4}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
      {loading ? <Spinner color="purple.400" /> : null}
    </>
  );
};

export default Liked;
