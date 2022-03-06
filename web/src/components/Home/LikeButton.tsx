import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import LikeService from "../../services/LikeService";

interface LikeButtonProps {
  postId: string;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    setIsLiked((prev) => !prev);

    setLoading(true);
    if (isLiked) {
      await LikeService.unLike(postId);
      setLikeAmount((prev) => prev - 1);
    } else {
      await LikeService.like(postId);
      setLikeAmount((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadLikeInfo = async () => {
      setLoading(true);
      const { liked, amount } = await LikeService.getInfo(postId);

      setLikeAmount(amount);
      setIsLiked(liked);
      setLoading(false);
    };

    loadLikeInfo;
  }, []);

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
      {likeAmount}
    </Button>
  );
};

export default LikeButton;
