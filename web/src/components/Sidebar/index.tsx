import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import User from "../../interfaces/User";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  user: User;
  children: ReactNode;
}

const Sidebar = ({ user, children }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
