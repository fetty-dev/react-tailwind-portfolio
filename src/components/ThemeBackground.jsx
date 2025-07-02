import { useEffect, useState } from "react";
import { StarBackground } from "./StarBackground";
import { LightSkyBackground } from "./LightSkyBackground";

/**
 * ThemeBackground - Wrapper component that automatically switches background animations
 * 
 * Shows StarBackground (meteors & comets) in dark mode
 * Shows LightSkyBackground (sun & hills) in light mode
 * 
 * Features smooth fade transition between themes for better UX
 * Reacts instantly to theme changes by listening to the 'dark' class on document.documentElement
 * Uses the same theme detection pattern as ThemeToggle.jsx
 */
export const ThemeBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Initial theme detection - check for 'dark' class on html element
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      
      // Only trigger transition if theme actually changed
      if (hasDarkClass !== isDarkMode) {
        setIsTransitioning(true);
        
        // Smooth transition: fade out current, switch, fade in new
        setTimeout(() => {
          setIsDarkMode(hasDarkClass);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 150); // Half of the transition duration
        }, 150);
      }
    };

    // Set initial theme (no transition on first load)
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDarkMode(hasDarkClass);

    // Create observer to watch for theme changes on the html element
    // This ensures smooth reaction when ThemeToggle.jsx adds/removes the 'dark' class
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
  }, [isDarkMode]);

  // Render both backgrounds with transition classes
  return (
    <div className="fixed inset-0 z-0">
      {/* Dark theme background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          isDarkMode && !isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <StarBackground />
      </div>
      
      {/* Light theme background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
          !isDarkMode && !isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LightSkyBackground />
      </div>
    </div>
  );
};