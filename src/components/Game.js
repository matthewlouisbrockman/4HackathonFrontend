import styled from "@emotion/styled";

import { ImputBar } from "./InputBar";

export const Game = () => {
  return (
    <GameContainer>
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
