import PostService from "../../services/postService";
import PostList from "../PostList";

const Liked = () => {
  return <PostList fetchFunction={PostService.getLiked} searchTerm="" />;
};

export default Liked;
