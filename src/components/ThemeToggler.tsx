import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={changeTheme} variant={"ghost"} size={"icon"}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
