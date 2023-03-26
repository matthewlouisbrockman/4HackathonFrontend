import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import styled from "@emotion/styled";

import { updateCombatAction } from "../apis/combatAPIs";

export const CombatDisplay = () => {
  const {
    currentEnemy,
    setMode,
    setCurrentEnemy,
    setEnemies,
    party,
    setParty,
    gameId,
    setHistory,
    setStateData,
  } = useContext(StateContext);

  const handleCapture = (enemy) => {
    const newParty = [...party];
    newParty.push(enemy);
    setParty(newParty);

    setEnemies((oldEnemies) => oldEnemies.filter((e) => e !== enemy));
    setCurrentEnemy({});
    handleEnemyDefeat(enemy);
    setHistory((prev) => [
      ...prev,
      { narrative: "You have captured: " + enemy.name, type: "bot" },
    ]);
  };

  const handleEnemyDefeat = async (enemy) => {
    const action = await updateCombatAction({
      combatResult: {
        narrative: "Your team has defeated an enemy!",
        enemeyDefeated: enemy,
        monsters: [],
      },
      gameId,
    });
    if (action.status === "success") {
      setHistory((prev) => [...prev, { ...action?.results, type: "bot" }]);
      setStateData(action?.results?.state);
      setEnemies(action?.results?.monsters || []);
    }
  };

  return (
    <CombatContainer>
      <GroupDisplays>
        {<PartyContainer party={party} />}
        {currentEnemy?.name && (
          <EnemyTeamContainer
            enemies={[currentEnemy]}
            captureEnemy={(enemy) => handleCapture(enemy)}
          />
        )}
      </GroupDisplays>
      <RunAwayButton
        onClick={() => {
          setMode("explore");
          setCurrentEnemy({});
        }}
      >
        {currentEnemy?.name ? "Run Away" : "Return to Exploration"}
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

const GroupDisplays = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const EnemyTeamContainer = ({ enemies, captureEnemy }) => {
  return (
    <EnemyTeamDisplay>
      <div>Enemy</div>
      {enemies.map((enemy) => {
        return (
          <EnemyDisplay>
            <div>Name: {enemy.name}</div>
            <div>Max Health: {enemy.maxHealth}</div>
            <div>Current Helath: {enemy.curentHealth || "0"}</div>
            {!enemy.curentHealth && (
              <button
                onClick={() => {
                  captureEnemy(enemy);
                }}
              >
                Capture
              </button>
            )}
          </EnemyDisplay>
        );
      })}
    </EnemyTeamDisplay>
  );
};

const EnemyTeamDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: red;
  padding: 10px;
`;

const EnemyDisplay = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(255, 0, 0, 0.5);
  padding: 20px;
`;

const PartyContainer = ({ party }) => {
  return (
    <PartyDisplay>
      <div>Your Party</div>
      {party.map((member) => {
        return (
          <PartyMemberDisplay>
            <div>Name: {member.name}</div>
            <div>Max Health: {member.maxHealth}</div>
            <div>Current Helath: {member.curentHealth || "0"}</div>
            {member.attacks.map((attack) => {
              return (
                <div>
                  <div>Attack Name: {attack.name}</div>
                </div>
              );
            })}
          </PartyMemberDisplay>
        );
      })}
    </PartyDisplay>
  );
};

const PartyDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: green;
`;

const PartyMemberDisplay = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 255, 0, 0.5);
  padding: 20px;
`;
