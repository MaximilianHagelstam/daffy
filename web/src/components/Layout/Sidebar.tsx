import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiHeart, FiHome, FiTv } from "react-icons/fi";
import NavItem from "./NavItem";

interface LinkItem {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: LinkItem[] = [
  { name: "Home", link: "/", icon: FiHome },
  { name: "Liked", link: "/liked", icon: FiHeart },
  { name: "Live chat", link: "/chat", icon: FiTv },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Nito
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((linkItem) => (
        <NavItem key={linkItem.name} link={linkItem.link} icon={linkItem.icon}>
          {linkItem.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default Sidebar;
