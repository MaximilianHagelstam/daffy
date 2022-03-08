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
      <PostList fetchFunction={PostService.getAll} />
      <CreateButton />
    </>
  );
};

export default Home;
