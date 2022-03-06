const getRandomAvatarUrl = () => {
  const seed = (Math.random() + 1).toString(36).substring(2);
  return `https://avatars.dicebear.com/api/big-ears-neutral/${seed}.svg`;
};

export default getRandomAvatarUrl;
