import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Illustration from "./Illustration";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={16} px={6}>
      <Heading
        display="inline-block"
        size="4xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>
      <Button
        colorScheme="purple"
        bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
        color="white"
        variant="solid"
        size="lg"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </Button>
      <Center mt={16}>
        <Illustration />
      </Center>
    </Box>
  );
};

export default NotFound;
