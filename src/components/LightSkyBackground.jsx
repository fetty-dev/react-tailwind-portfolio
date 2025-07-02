import { useEffect, useState } from "react";

/**
 * LightSkyBackground - A sunny day animation component
 * Features: Animated sun, gradient sky, rolling hills, floating clouds, and wind ripples
 * Matches the layout and structure of StarBackground for consistency
 */
export const LightSkyBackground = () => {
  const [clouds, setClouds] = useState([]);
  const [windRipples, setWindRipples] = useState([]);

  useEffect(() => {
    generateClouds();
    generateWindRipples();

    const handleResize = () => {
      generateClouds();
      generateWindRipples();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate floating clouds based on screen size
  const generateClouds = () => {
    const numberOfClouds = Math.max(3, Math.floor(window.innerWidth / 400));
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      newClouds.push({
        id: i,
        size: Math.random() * 60 + 40, // Cloud size: 40-100px
        x: Math.random() * 120 - 10, // Allow clouds to start/end off-screen
        y: Math.random() * 25 + 10, // Keep clouds in upper 35% of screen
        opacity: Math.random() * 0.4 + 0.6, // Opacity: 0.6-1.0
        animationDuration: Math.random() * 60 + 40, // Very slow drift: 40-100s
        animationDelay: Math.random() * 20, // Stagger cloud start times
      });
    }

    setClouds(newClouds);
  };

  // Generate subtle wind ripple effects across the hills
  const generateWindRipples = () => {
    const numberOfRipples = 6;
    const newRipples = [];

    for (let i = 0; i < numberOfRipples; i++) {
      newRipples.push({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 30, // Position on hills (60-90% down screen)
        size: Math.random() * 100 + 50, // Ripple size: 50-150px
        animationDuration: Math.random() * 4 + 3, // Duration: 3-7s
        animationDelay: Math.random() * 8, // Stagger ripple start times
      });
    }

    setWindRipples(newRipples);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
      
      {/* Animated sun */}
      <div className="sun-container absolute top-[15%] right-[20%]">
        <div className="sun animate-sun-glow" />
        <div className="sun-rays animate-sun-rotate" />
      </div>

      {/* Rolling hills - multiple layers for depth */}
      <div className="absolute bottom-0 left-0 w-full">
        {/* Back hills - lighter green */}
        <svg className="absolute bottom-0 w-full h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path
            d="M0,100 C300,60 600,140 900,80 C1050,40 1150,100 1200,90 L1200,200 L0,200 Z"
            className="fill-green-300 animate-hill-sway-slow"
          />
        </svg>
        
        {/* Front hills - darker green */}
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <path
            d="M0,80 C200,40 400,100 600,60 C800,20 1000,80 1200,50 L1200,160 L0,160 Z"
            className="fill-green-400 animate-hill-sway"
          />
        </svg>
      </div>

      {/* Floating clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud animate-cloud-drift"
          style={{
            width: cloud.size + "px",
            height: cloud.size * 0.6 + "px", // Clouds are wider than tall
            left: cloud.x + "%",
            top: cloud.y + "%",
            opacity: cloud.opacity,
            animationDuration: cloud.animationDuration + "s",
            animationDelay: cloud.animationDelay + "s",
          }}
        />
      ))}

      {/* Wind ripples on hills */}
      {windRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="wind-ripple animate-wind-ripple"
          style={{
            width: ripple.size + "px",
            height: ripple.size * 0.3 + "px", // Ripples are very wide and short
            left: ripple.x + "%",
            top: ripple.y + "%",
            animationDuration: ripple.animationDuration + "s",
            animationDelay: ripple.animationDelay + "s",
          }}
        />
      ))}
    </div>
  );
};