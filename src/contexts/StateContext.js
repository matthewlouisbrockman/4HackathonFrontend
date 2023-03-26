import { createContext, useState, useEffect } from "react";
import { getLocationImage } from "../apis/imagesAPIs";

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
  const [backgroundImage, setBackgroundImage] = useState(null);

  console.log("gameid", gameId);
  console.log("context location name", stateData?.location);

  const locationName = stateData?.location;
  const loadImageFromServer = async () => {
    const imageRes = await getLocationImage({ name: locationName });
    //this returns a base64 string
    if (imageRes.status === "success") {
      setBackgroundImage(imageRes.url);
    }
  };

  useEffect(() => {
    if (locationName) {
      loadImageFromServer();
    }
  }, [locationName]);

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
        backgroundImage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
