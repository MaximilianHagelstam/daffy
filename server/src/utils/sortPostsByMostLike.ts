import Post from "../entities/Post";

const sortPostsByMostLiked = (posts: Post[]): Post[] =>
  posts.sort((one, other) => other.likes.length - one.likes.length);

export default sortPostsByMostLiked;
