import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import LikeService from "../../services/likeService";
import { kFormatter } from "../../utils/formatters";

interface LikeButtonProps {
  postId: string;
  likes: number;
  liked: boolean;
}

const LikeButton = ({ postId, likes, liked }: LikeButtonProps) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [likeAmount, setLikeAmount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = async () => {
    setLoading(true);

    let isError: boolean;
    let likeIteration: -1 | 1;

    if (isLiked) {
      const unLikedRes = await LikeService.unLikePost(postId);
      isError = unLikedRes.isError;
      likeIteration = -1;
    } else {
      const likedRes = await LikeService.likePost(postId);
      likeIteration = 1;
      isError = likedRes.isError;
    }

    if (isError) {
      toast({
        title: "Error updating post",
        status: "error",
        isClosable: true,
      });
    } else {
      setIsLiked((prev) => !prev);
      setLikeAmount((prev) => prev + likeIteration);
    }

    setLoading(false);
  };

  return (
    <Button
      colorScheme="red"
      size="sm"
      variant="ghost"
      rounded="full"
      isLoading={loading}
      leftIcon={isLiked ? <BsHeartFill /> : <BsHeart />}
      onClick={handleLike}
    >
      {kFormatter(likeAmount)}
    </Button>
  );
};

export default LikeButton;
