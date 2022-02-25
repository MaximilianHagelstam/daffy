import { IconType } from "react-icons";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

interface LinkItem {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: LinkItem[] = [
  { name: "Home", link: "/", icon: FiHome },
  { name: "Trending", link: "/trending", icon: FiTrendingUp },
  { name: "Explore", link: "/explore", icon: FiCompass },
  { name: "Favorites", link: "/favorites", icon: FiStar },
  { name: "Settings", link: "/settings", icon: FiSettings },
];

export default LinkItems;
