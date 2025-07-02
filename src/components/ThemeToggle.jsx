import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [themeMode, setThemeMode] = useState("auto"); // "light", "dark", "auto"

  // Auto theme detection based on system preference and time of day
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    const isNightTime = hour < 7 || hour >= 19; // 7 PM to 7 AM is dark mode

    // Check system preference first
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Combine time and system preference (weighted towards time of day)
    return isNightTime || systemPrefersDark;
  };

  // Apply theme to document
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Get stored theme preference or default to auto
    const storedTheme = localStorage.getItem("theme") || "auto";
    setThemeMode(storedTheme);

    let shouldBeDark = false;

    if (storedTheme === "dark") {
      shouldBeDark = true;
    } else if (storedTheme === "light") {
      shouldBeDark = false;
    } else {
      // Auto mode: use system preference + time of day
      shouldBeDark = getAutoTheme();
    }

    applyTheme(shouldBeDark);

    // Listen for system theme changes in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (themeMode === "auto") {
        applyTheme(getAutoTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Check time every minute for auto mode
    const timeInterval = setInterval(() => {
      if (themeMode === "auto") {
        applyTheme(getAutoTheme());
      }
    }, 60000); // Check every minute

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      clearInterval(timeInterval);
    };
  }, [themeMode]);

  const cycleTheme = () => {
    let nextMode;
    let nextIsDark;

    if (themeMode === "light") {
      nextMode = "dark";
      nextIsDark = true;
    } else if (themeMode === "dark") {
      nextMode = "auto";
      nextIsDark = getAutoTheme();
    } else {
      nextMode = "light";
      nextIsDark = false;
    }

    setThemeMode(nextMode);
    localStorage.setItem("theme", nextMode);
    applyTheme(nextIsDark);
  };

  // Get appropriate icon and label
  const getIconAndLabel = () => {
    if (themeMode === "light") {
      return { icon: Sun, label: "Switch to dark mode" };
    } else if (themeMode === "dark") {
      return { icon: Moon, label: "Switch to auto mode" };
    } else {
      return { icon: Monitor, label: "Switch to light mode" };
    }
  };

  const { icon: Icon, label } = getIconAndLabel();

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        "hidden md:block fixed top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "bg-background/80 backdrop-blur-sm border border-border/50",
        "hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "sm:bg-transparent sm:border-0 sm:hover:bg-transparent sm:focus:ring-offset-0"
      )}
      aria-label={label}
      title={`Current: ${themeMode} mode`}
    >
      <Icon className={cn(
        "h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300",
        themeMode === "light" && "text-yellow-500",
        themeMode === "dark" && "text-blue-400", 
        themeMode === "auto" && "text-gray-500"
      )} />
    </button>
  );
};