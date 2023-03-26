import { useEffect, useState, useContext } from "react";

import styled from "@emotion/styled";

import { ImputBar } from "./InputBar";
import { HistoryDisplay } from "./HistoryDisplay";
import { StateDisplay } from "./StateDisplay";
import { StateContext } from "../contexts/StateContext";
import { setupGame } from "../apis/stateAPIs";
import { CombatDisplay } from "../combat/CombatDisplay";
import { ImageBox } from "./ImageBox";

export const Game = () => {
  const { setHistory, setStateData, setEnemies, mode, setGameId } =
    useContext(StateContext);

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
    <GameContainer>
      <ImageBox />
      {mode === "explore" && (
        <>
          <StateDisplay />
          <HistoryDisplay />
          <ImputBar />
        </>
      )}
      {mode === "combat" && <CombatDisplay />}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
