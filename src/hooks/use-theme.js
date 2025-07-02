import { useEffect, useState } from "react";

/**
 * Custom hook for theme management
 * Provides theme state and functions for both ThemeToggle and Navbar components
 * Supports light, dark, and auto modes with system preference and time-based detection
 */
export const useTheme = () => {
  const [themeMode, setThemeMode] = useState("auto");

  // Auto theme detection based on system preference and time of day
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    const isNightTime = hour < 7 || hour >= 19; // 7 PM to 7 AM is dark mode
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

  // Cycle through theme modes: light → dark → auto → light
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
      if (storedTheme === "auto") {
        applyTheme(getAutoTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Check time every minute for auto mode
    const timeInterval = setInterval(() => {
      if (localStorage.getItem("theme") === "auto") {
        applyTheme(getAutoTheme());
      }
    }, 60000); // Check every minute

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      clearInterval(timeInterval);
    };
  }, []);

  return {
    themeMode,
    cycleTheme,
    getAutoTheme,
    applyTheme
  };
};