import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const Post = () => {
  return (
    <Box
      maxW="400px"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      rounded="2xl"
      px={4}
      overflow="hidden"
    >
      <Stack mt={4} direction="row" spacing={4} align="center">
        <Avatar src="https://avatars0.githubusercontent.com/u/1164541?v=4" />
        <Stack direction="column" spacing={0} fontSize="sm">
          <Text fontWeight={600}>Achim Rolle</Text>
          <Text color="gray.500">Feb 08, 2021</Text>
        </Stack>
      </Stack>
      <Text py={4} fontSize="md">
        hubsnvekbsqwsfloojsnldysdkaktkwhwozjgynpbbblcbjjmnuegmgwoijtnaczsvrsstowqjkyyftfvrewwldwapzdkczuptfnlylyrketrqdneqqnqjzsiuiuziuwvarhqeuimjssiggszuiowv
      </Text>
    </Box>
  );
};

export default Post;
