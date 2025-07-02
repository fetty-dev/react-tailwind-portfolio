import { useEffect, useState } from "react";
import { StarBackground } from "./StarBackground";
import { LightSkyBackground } from "./LightSkyBackground";

/**
 * ThemeBackground - Wrapper component that automatically switches background animations
 * 
 * Shows StarBackground (meteors & comets) in dark mode
 * Shows LightSkyBackground (sun & hills) in light mode
 * 
 * Reacts instantly to theme changes by listening to the 'dark' class on document.documentElement
 * Uses the same theme detection pattern as ThemeToggle.jsx
 */
export const ThemeBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial theme detection - check for 'dark' class on html element
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDarkMode(hasDarkClass);
    };

    // Set initial theme
    checkTheme();

    // Create observer to watch for theme changes on the html element
    // This ensures instant reaction when ThemeToggle.jsx adds/removes the 'dark' class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    // Start observing class changes on document.documentElement
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Render the appropriate background based on current theme
  return isDarkMode ? <StarBackground /> : <LightSkyBackground />;
};