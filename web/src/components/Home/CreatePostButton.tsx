import { Box, IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const CreatePostButton = () => {
  return (
    <Box position="fixed" bottom="24px" right={["16px", "24px"]} zIndex={1}>
      <IconButton
        colorScheme="purple"
        aria-label="Create post"
        size="lg"
        icon={<FiPlus size={24} />}
        rounded="full"
      />
    </Box>
  );
};

export default CreatePostButton;
