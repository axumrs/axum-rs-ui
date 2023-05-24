import { createContext, useContext, useState } from "react";

export const MainMenuContext = createContext();

export function MainMenuContextProvider({ value, children }) {
  const [open, setOpen] = useState(value);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <MainMenuContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </MainMenuContext.Provider>
  );
}

export const useMainMenuContext = () => useContext(MainMenuContext);
