import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export const ThemeToggle = () => {
  const { themeMode, cycleTheme } = useTheme();

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