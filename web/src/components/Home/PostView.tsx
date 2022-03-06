import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Post from "../../interfaces/Post";
import { formatDate } from "../../utils/formatters";

interface PostViewProps {
  post: Post;
}

const PostView = ({ post }: PostViewProps) => {
  const formattedDate = formatDate(post.createdAt);

  return (
    <Box
      maxW="400px"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
      rounded="2xl"
      px={4}
      overflow="hidden"
    >
      <Stack mt={4} direction="row" spacing={4} align="center">
        <Avatar src={post.creator.avatar} />
        <Stack direction="column" spacing={0} fontSize="sm">
          <Text fontWeight={600}>@{post.creator.username}</Text>
          <Text color="gray.500">{formattedDate}</Text>
        </Stack>
      </Stack>
      <Text py={4} fontSize="md">
        {post.body}
      </Text>
    </Box>
  );
};

export default PostView;
