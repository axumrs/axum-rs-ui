"use client";

import { createContext, useState } from "react";

type MainMenuContextProps = { isOpen: () => boolean; toggle: () => void };
export const MainMenuContext = createContext<MainMenuContextProps>({
  isOpen: () => false,
  toggle: () => {},
});

export function MainMenuContextProvider({
  value,
  children,
}: { value: boolean } & ChildrenProps) {
  const [open, setOpen] = useState(value);

  const isOpen = () => {
    return open;
  };
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <MainMenuContext.Provider value={{ isOpen, toggle }}>
      {children}
    </MainMenuContext.Provider>
  );
}
