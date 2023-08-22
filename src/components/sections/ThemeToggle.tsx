/* eslint-disable @typescript-eslint/unbound-method */
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon size="sm" variant="outline" color="qwangu.5" radius="xl" onClick={() => toggleColorScheme()} title="Toggle color scheme">
      {dark ? <MdOutlineLightMode size="1.1rem" /> : <MdDarkMode size="1.1rem" />}
    </ActionIcon>
  );
}
