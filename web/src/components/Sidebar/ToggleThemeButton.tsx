import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="change theme"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      rounded="full"
      variant="ghost"
      onClick={toggleColorMode}
      mx="4"
    />
  );
};

export default ToggleThemeButton;
