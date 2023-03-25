import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  return (
    <StateContext.Provider value={{ history, setHistory }}>
      {children}
    </StateContext.Provider>
  );
};
