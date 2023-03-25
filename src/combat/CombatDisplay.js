import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import styled from "@emotion/styled";

export const CombatDisplay = () => {
  const {
    currentEnemy,
    mode,
    setMode,
    setCurrentEnemy,
    setEnemies,
    party,
    setParty,
  } = useContext(StateContext);

  return (
    <CombatContainer>
      <EnemyTeamContainer enemies={currentEnemy} />
      <RunAwayButton
        onClick={() => {
          setMode("explore");
          setCurrentEnemy({});
        }}
      >
        Run Away
      </RunAwayButton>
    </CombatContainer>
  );
};

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const RunAwayButton = styled.button`
  width: 100px;
  height: 50px;
  margin: 10px;
`;

const EnemyTeamContainer = ({ enemies }) => {
  return <EnemyTeamDisplay>{JSON.stringify(enemies)}</EnemyTeamDisplay>;
};

const EnemyTeamDisplay = styled.div`
  display: flex;
  flex-direction: row;
`;
