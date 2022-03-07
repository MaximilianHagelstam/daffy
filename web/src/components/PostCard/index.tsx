import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { UserContext } from "../../context/userContext";
import Post from "../../interfaces/Post";
import { dateFormatter } from "../../utils/formatters";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = dateFormatter(post.createdAt);
  const user = useContext(UserContext);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const likeAmount = post.likes!.length;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postIsLiked = post.likes!.find((like) => like.userId === user!.id)
    ? true
    : false;

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
      <HStack mb={2}>
        <LikeButton postId={post.id} likes={likeAmount} liked={postIsLiked} />
        <IconButton
          colorScheme="blue"
          size="sm"
          variant="ghost"
          rounded="full"
          icon={<FiMessageCircle />}
          aria-label="Comment"
        />
        {user?.id === post.creatorId ? <DeleteButton postId={post.id} /> : null}
      </HStack>
    </Box>
  );
};

export default PostCard;
