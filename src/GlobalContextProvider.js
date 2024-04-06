import React, { useState, createContext, useContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  /* The provider lets you provide context value. This value can be read by calling useContext */
  return (
    <GlobalContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </GlobalContext.Provider>
  );
};
