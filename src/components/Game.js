import { useEffect, useState, useContext } from "react";

import styled from "@emotion/styled";

import { ImputBar } from "./InputBar";
import { HistoryDisplay } from "./HistoryDisplay";
import { StateDisplay } from "./StateDisplay";
import { StateContext } from "../contexts/StateContext";
import { setupGame } from "../apis/stateAPIs";

export const Game = () => {
  const { setHistory, setStateData } = useContext(StateContext);

  const [mode, setMode] = useState("explore");

  const initialize = async () => {
    const action = await setupGame();
    if (action.status === "success") {
      setHistory((prev) => [{ ...action?.results, type: "bot" }]);
      setStateData(action?.results?.state);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <GameContainer>
      {mode === "explore" && (
        <>
          <StateDisplay />
          <HistoryDisplay />
          <ImputBar />
        </>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
