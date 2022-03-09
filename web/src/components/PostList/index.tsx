import { Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Post from "../../interfaces/Post";
import PostCard from "../PostCard";

const useDidMountEffect = (
  func: React.EffectCallback,
  deps: React.DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

interface PostListProps {
  fetchFunction: (page: number, perPage: number) => Promise<Post[]>;
  searchTerm?: string;
}

const PostList = ({ fetchFunction, searchTerm }: PostListProps) => {
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

  useDidMountEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setPage(1);
      const fetchedPosts = await fetchFunction(1, 20);
      setPosts(fetchedPosts);
      setHasMore(true);
      setLoading(false);
    };
    getPosts();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchFunction]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      if (!hasMore) {
        setLoading(false);
        return;
      }

      const fetchedPosts = await fetchFunction(page, 20);

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
        {searchTerm ? (
          <>
            {posts
              .filter((post) => {
                if (searchTerm === "") return post;
                return post.body
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              })
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </Stack>
      {loading ? <Spinner color="purple.400" /> : null}
    </>
  );
};

export default PostList;
