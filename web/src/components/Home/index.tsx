import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import PostService from "../../services/PostService";
import CreateButton from "./CreateButton";
import PostList from "./PostList";
import SortMenu from "./SortMenu";

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
      if (!hasMore) return;

      const fetchedPosts = await PostService.getAll(page, 20);

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
      <SortMenu
        handleNewest={() => {
          // eslint-disable-next-line no-console
          console.log("newest");
        }}
        handleOldest={() => {
          // eslint-disable-next-line no-console
          console.log("oldest");
        }}
        handlePopular={() => {
          // eslint-disable-next-line no-console
          console.log("popular");
        }}
      />
      <PostList posts={posts} />
      {loading ? <Spinner color="purple.400" /> : null}
      <CreateButton />
    </>
  );
};

export default Home;
