// hooks/useComponentReload.js
import { useState, useCallback } from "react";

const useComponentReload = () => {
  const [, setReload] = useState(0);

  const triggerReload = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  return triggerReload;
};

export default useComponentReload;
