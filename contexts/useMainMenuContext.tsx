"use client";

import { useContext } from "react";
import { MainMenuContext } from "./MainMenuContext";

export const useMainMenuContext = () => useContext(MainMenuContext);
