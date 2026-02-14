import { useCallback, useEffect, useRef, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isSmallScreen: boolean;
}

const DEFAULT_SIZE: WindowSize = {
  width: 0,
  height: 0,
  isMobile: false,
  isTablet: false,
  isSmallScreen: false,
};

const getWindowSize = (): WindowSize => {
  if (typeof window === "undefined") return DEFAULT_SIZE;
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    width: w,
    height: h,
    isMobile: w <= 549,
    isTablet: w <= 768,
    isSmallScreen: w <= 1050,
  };
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateWindowSize = useCallback(() => {
    setWindowSize(getWindowSize());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(updateWindowSize, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [updateWindowSize]);

  return windowSize;
};
