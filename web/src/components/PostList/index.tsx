import { Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Post from "../../interfaces/Post";
import PostCard from "../PostCard";

interface PostListProps {
  fetchFunction: (page: number, perPage: number) => Promise<Post[]>;
  searchTerm: string;
}

const PostList = ({ fetchFunction, searchTerm }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
  }, [page]);

  return (
    <>
      <Stack spacing={4}>
        {posts
          .filter((post) => {
            if (searchTerm === "") return post;
            return post.body.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </Stack>
      {hasMore && (
        <Button
          w="full"
          maxW="400px"
          mt={4}
          variant="ghost"
          colorScheme="purple"
          isLoading={loading}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default PostList;
