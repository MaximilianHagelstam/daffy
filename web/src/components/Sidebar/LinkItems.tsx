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
}

const LinkItems: LinkItem[] = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favorites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default LinkItems;
