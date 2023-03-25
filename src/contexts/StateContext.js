import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [stateData, setStateData] = useState({});
  const [team, setTeam] = useState({});
  const [world, setWorld] = useState({});
  const [possibleActions, setPossibleActions] = useState([]);

  return (
    <StateContext.Provider
      value={{
        history,
        setHistory,
        stateData,
        setStateData,
        team,
        setTeam,
        world,
        setWorld,
        possibleActions,
        setPossibleActions,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
