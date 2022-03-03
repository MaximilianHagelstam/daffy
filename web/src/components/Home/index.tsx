import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import PostService from "../../services/PostService";
import "./Home.css";
import PostList from "./PostList";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const fetchedPosts = await PostService.getAll(page, 10);
      setPosts((prev) => [...prev, ...fetchedPosts]);
      setLoading(false);
    };

    getPosts();
  }, [page]);

  return (
    <>
      <div className="content" onScroll={handleScroll}>
        <PostList posts={posts} />
      </div>
      {loading ? <Spinner color="purple.400" /> : null}
    </>
  );
};

export default Home;
