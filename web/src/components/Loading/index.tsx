import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Spinner size="xl" color="purple.400" />
    </Flex>
  );
};

export default Loading;
