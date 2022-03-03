import { Stack } from "@chakra-ui/react";
import Post from "../../interfaces/Post";
import PostView from "./PostView";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <Stack spacing={4}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostList;
