
"use client";

import { ReactNode, useEffect } from "react";
import { useAppStore } from "./store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const { isDarkMode } = useAppStore();
  
  useEffect(() => {
    // Set dark mode class on document
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  
  return children;
}
