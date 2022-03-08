import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import PostService from "../../services/PostService";
import PostList from "../PostList";
import CreateButton from "./CreateButton";

const Home = () => {
  return (
    <>
      {/* <SortMenu
        handleNewest={() => {
          // eslint-disable-next-line no-console
          console.log("newest");
        }}
        handleOldest={() => {
          // eslint-disable-next-line no-console
          console.log("oldest");
        }}
        handlePopular={() => {
          // eslint-disable-next-line no-console
          console.log("popular");
        }}
      /> */}
      <InputGroup colorScheme="purple" maxW="400px" mb={8}>
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input type="text" placeholder="Search" focusBorderColor="purple.400" />
      </InputGroup>
      <PostList fetchFunction={PostService.getAll} />
      <CreateButton />
    </>
  );
};

export default Home;
