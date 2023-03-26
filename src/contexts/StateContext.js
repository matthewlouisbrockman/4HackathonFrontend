import { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [stateData, setStateData] = useState({});
  const [enemies, setEnemies] = useState([]);
  const [world, setWorld] = useState({});
  const [possibleActions, setPossibleActions] = useState([]);
  const [party, setParty] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState({});
  const [mode, setMode] = useState("explore");
  const [gameId, setGameId] = useState("");

  const [imageUrls, setImageUrls] = useState({});

  console.log("gameid", gameId);

  return (
    <StateContext.Provider
      value={{
        history,
        setHistory,
        stateData,
        setStateData,
        world,
        setWorld,
        possibleActions,
        setPossibleActions,
        party,
        setParty,
        enemies,
        setEnemies,
        currentEnemy,
        setCurrentEnemy,
        mode,
        setMode,
        gameId,
        setGameId,
        imageUrls,
        setImageUrls,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
