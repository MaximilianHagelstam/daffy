import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import LikeService from "../../services/LikeService";
import { kFormatter } from "../../utils/formatters";

interface LikeButtonProps {
  postId: string;
  likes: number;
  liked: boolean;
}

const LikeButton = ({ postId, likes, liked }: LikeButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [likeAmount, setLikeAmount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = async () => {
    setIsLiked((prev) => !prev);

    setLoading(true);
    if (isLiked) {
      await LikeService.unLikePost(postId);
      setLikeAmount((prev) => prev - 1);
    } else {
      await LikeService.likePost(postId);
      setLikeAmount((prev) => prev + 1);
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
