import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <InputGroup colorScheme="purple">
      <InputLeftElement pointerEvents="none">
        <FiSearch />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search"
        focusBorderColor="purple.400"
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
