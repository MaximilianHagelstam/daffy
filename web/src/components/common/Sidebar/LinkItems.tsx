import { IconType } from "react-icons";
import { FiHeart, FiHome, FiSearch, FiTv } from "react-icons/fi";

interface LinkItem {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: LinkItem[] = [
  { name: "Home", link: "/", icon: FiHome },
  { name: "Search", link: "/search", icon: FiSearch },
  { name: "Liked", link: "/liked", icon: FiHeart },
  { name: "Live chat", link: "/chat", icon: FiTv },
];

export default LinkItems;
