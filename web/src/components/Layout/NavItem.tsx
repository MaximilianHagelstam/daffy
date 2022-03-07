import { Flex, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { useLocation } from "react-router-dom";

interface NavItemProps {
  icon: IconType;
  link: string;
  children: ReactText;
}

const NavItem = ({ icon, link, children }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  const bgColorSelected = useColorModeValue("purple.500", "purple.500");
  const bgColorHover = useColorModeValue("purple.100", "purple.800");

  return (
    <Link
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? bgColorSelected : undefined}
        color={isActive ? "white" : undefined}
        _hover={{
          bg: isActive ? bgColorSelected : bgColorHover,
        }}
      >
        <Icon mr="4" fontSize="16" as={icon} />
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
