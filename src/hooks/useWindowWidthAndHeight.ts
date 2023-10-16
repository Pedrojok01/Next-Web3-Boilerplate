import { useEffect, useState } from "react";

export const useWindowWidthAndHeight = () => {
  const windowInnerSize = [window.innerWidth, window.innerHeight];
  const [windowSize, setWidowSize] = useState<number[]>(windowInnerSize);

  useEffect(() => {
    const changeWindowSize = () => {
      setWidowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobileOnly = windowSize[0] <= 549;
  const isMobile = windowSize[0] <= 768;
  const isTablet = windowSize[0] <= 1050;

  return { windowSize, isMobileOnly, isMobile, isTablet };
};
