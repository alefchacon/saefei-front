import { createContext, useContext, useState, useRef } from "react";

export const PageContext = createContext(null);

export function usePage() {
  return useContext(PageContext);
}
export function PageProvider({ children }) {
  const pageRef = useRef(null);

  const scrollToTop = () => {
    pageRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <PageContext.Provider value={{ pageRef, scrollToTop }}>
      {children}
    </PageContext.Provider>
  );
}
