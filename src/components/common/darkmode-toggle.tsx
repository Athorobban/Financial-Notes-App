"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function DarkmodeToggle() {
  // resolvedTheme digunakan untuk mengetahui secara absolut (terang/gelap)
  // bahkan ketika preferensi user diset ke "system"
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleToggleTheme = () => {
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggleTheme} className="rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-transform duration-500 ease-in-out dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-transform duration-500 ease-in-out dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
