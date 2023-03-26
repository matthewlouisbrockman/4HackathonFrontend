import { useEffect, useContext } from "react";

import styled from "@emotion/styled";

import { ImputBar } from "./InputBar";
import { HistoryDisplay } from "./HistoryDisplay";
import { StateDisplay } from "./StateDisplay";
import { StateContext } from "../contexts/StateContext";
import { setupGame } from "../apis/stateAPIs";
import { CombatDisplay } from "../combat/CombatDisplay";

export const Game = () => {
  const {
    setHistory,
    setStateData,
    setEnemies,
    mode,
    setGameId,
    backgroundImage,
  } = useContext(StateContext);

  const initialize = async () => {
    const action = await setupGame();
    if (action.status === "success") {
      setHistory((prev) => [{ ...action?.results, type: "bot" }]);
      setStateData(action?.results?.state);
      setEnemies(action?.results?.monsters);
      setGameId(action?.gameId);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <GameContainer
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          //image should be 10% transparent
          background: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {mode === "explore" && (
          <>
            <StateDisplay />
            <HistoryDisplay />
            <ImputBar />
          </>
        )}
        {mode === "combat" && <CombatDisplay />}
      </div>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
