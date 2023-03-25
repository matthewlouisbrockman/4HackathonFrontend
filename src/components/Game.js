import styled from "@emotion/styled";

import { ImputBar } from "./InputBar";
import { HistoryDisplay } from "./HistoryDisplay";
import { StateDisplay } from "./StateDisplay";

export const Game = () => {
  return (
    <GameContainer>
      <StateDisplay />
      <HistoryDisplay />
      <ImputBar />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
