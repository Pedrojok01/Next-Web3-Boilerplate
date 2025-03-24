import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isSmallScreen: boolean;
}

const DEFAULT_SIZE = {
  width: 0,
  height: 0,
  isMobile: false,
  isTablet: false,
  isSmallScreen: false,
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(DEFAULT_SIZE);

  useEffect(() => {
    // Only execute this code on the client
    if (typeof window === "undefined") return;

    const updateWindowSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
        isMobile: width <= 549,
        isTablet: width <= 768,
        isSmallScreen: width <= 1050,
      });
    };

    // Set initial size
    updateWindowSize();

    // Add event listener
    window.addEventListener("resize", updateWindowSize);

    // Clean up
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
};
