import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import PostService from "../../services/PostService";
import PostList from "../PostList";
import CreateButton from "./CreateButton";
import SearchBar from "./SearchBar";
import SortMenu from "./SortMenu";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  if (sortBy === "oldest") {
    return (
      <>
        <HStack maxW="400px" mb={8} spacing={4}>
          <SearchBar
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SortMenu
            handleNewest={() => {
              setSortBy("newest");
            }}
            handleOldest={() => {
              setSortBy("oldest");
            }}
            handlePopular={() => {
              setSortBy("popular");
            }}
          />
        </HStack>
        <PostList
          fetchFunction={PostService.getByOldest}
          searchTerm={searchTerm}
        />
        <CreateButton />
      </>
    );
  } else if (sortBy === "popular") {
    return (
      <>
        <HStack maxW="400px" mb={8} spacing={4}>
          <SearchBar
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SortMenu
            handleNewest={() => {
              setSortBy("newest");
            }}
            handleOldest={() => {
              setSortBy("oldest");
            }}
            handlePopular={() => {
              setSortBy("popular");
            }}
          />
        </HStack>
        <PostList
          fetchFunction={PostService.getByPopular}
          searchTerm={searchTerm}
        />
        <CreateButton />
      </>
    );
  } else {
    return (
      <>
        <HStack maxW="400px" mb={8} spacing={4}>
          <SearchBar
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <SortMenu
            handleNewest={() => {
              setSortBy("newest");
            }}
            handleOldest={() => {
              setSortBy("oldest");
            }}
            handlePopular={() => {
              setSortBy("popular");
            }}
          />
        </HStack>
        <PostList
          fetchFunction={PostService.getByNewest}
          searchTerm={searchTerm}
        />
        <CreateButton />
      </>
    );
  }
};

export default Home;
