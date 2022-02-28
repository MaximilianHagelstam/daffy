import PostView from "./PostView";

const Home = () => {
  return (
    <>
      <PostView
        post={{
          id: "f4d7b7bd-fe39-4bc8-b98a-1e8df99320a7",
          body: "test",
          creatorId: "f01d4010-ef2b-4754-b77c-025fcd316e16",
          createdAt: "2022-02-28T15:11:57.742Z",
          updatedAt: "2022-02-28T15:11:57.742Z",
          creator: {
            id: "f01d4010-ef2b-4754-b77c-025fcd316e16",
            username: "penis",
            avatar:
              "https://avatars.dicebear.com/api/big-ears-neutral/wbltkyh0e1.svg",
            createdAt: "2022-02-23T09:14:27.957Z",
            updatedAt: "2022-02-23T09:14:27.957Z",
          },
        }}
      />
    </>
  );
};

export default Home;
