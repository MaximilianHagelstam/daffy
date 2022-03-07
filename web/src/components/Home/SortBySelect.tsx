import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiArrowDown,
  FiBarChart,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

interface SortBySelect {
  handleNewest: () => void;
  handleOldest: () => void;
  handlePopular: () => void;
}

const SortBySelect = ({
  handleNewest,
  handleOldest,
  handlePopular,
}: SortBySelect) => {
  return (
    <Box position="absolute" right="24px">
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<FiArrowDown />}
          colorScheme="purple"
        >
          Sort
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiChevronUp />} onClick={handleNewest}>
            Newest
          </MenuItem>
          <MenuItem icon={<FiChevronDown />} onClick={handleOldest}>
            Oldest
          </MenuItem>
          <MenuItem icon={<FiBarChart />} onClick={handlePopular}>
            Popular
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortBySelect;
