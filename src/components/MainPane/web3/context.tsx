import { createContext } from "react";

export const Context = createContext({
  b: "",
  setB: (_b: string) => {
    _b;
  },
});
