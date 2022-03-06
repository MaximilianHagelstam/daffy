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
  const bgColor = useColorModeValue("purple.300", "purple.500");

  return (
    <Link
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _activeLink={{ color: "red" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? bgColor : undefined}
        color={isActive ? "white" : undefined}
        _hover={{
          bg: `${bgColor}`,
          color: "white",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
