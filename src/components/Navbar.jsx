import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeMode, cycleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get appropriate icon
  const getIcon = () => {
    if (themeMode === "light") return Sun;
    if (themeMode === "dark") return Moon;
    return Monitor;
  };

  const ThemeIcon = getIcon();
  return (
    <nav
      className={cn(
        "fixed w-full z-30 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          href="#hero"
          aria-label="Go to home section"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> Fetty's </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label={`Go to ${item.name.toLowerCase()} section`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-secondary/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Current: ${themeMode} mode`}
          >
            <ThemeIcon className={cn(
              "h-5 w-5 transition-colors duration-300",
              themeMode === "light" && "text-yellow-500",
              themeMode === "dark" && "text-blue-400", 
              themeMode === "auto" && "text-gray-500"
            )} />
          </button>
          
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-[9999] relative"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu backdrop */}
        <div
          className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile menu drawer */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-[9999]",
            "transition-all duration-300 ease-in-out md:hidden",
            "flex flex-col shadow-xl",
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold text-primary">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col p-6 space-y-6">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-lg text-foreground/80 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-2 border-b border-border/30 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
                aria-label={`Go to ${item.name.toLowerCase()} section`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};