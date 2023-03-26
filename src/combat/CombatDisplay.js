import { useContext, useState, useEffect } from "react";
import { StateContext } from "../contexts/StateContext";
import styled from "@emotion/styled";

import { updateCombatAction } from "../apis/combatAPIs";
import { getMonsterImage } from "../apis/imagesAPIs";

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
    setPossibleActions,
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
      let newMonsters = action?.results?.monsters || [];
      // for each of the new monsters, set their currentHealth to maxHealth if their level > 0
      newMonsters = newMonsters.map((monster) =>
        monster.level > 0
          ? { ...monster, currentHealth: monster.maxHealth }
          : monster
      );
      setEnemies(newMonsters);
      setPossibleActions(action?.results?.possibleActions);
    }
  };

  const handleAttack = (partyIdx, enemyIdx, name) => {
    //get the attack for the party member of idx
    const attackData = party[partyIdx]?.attacks?.filter(
      (x) => x.name === name
    )[0];
    const dmg = attackData.damage + 2;

    const enemy = currentEnemy;
    enemy.currentHealth = enemy.curentHealth - dmg;
    setCurrentEnemy({ ...enemy });
    if (enemy.currentHealth && enemy.currentHealth > 0) {
      let friendlyChar = party[partyIdx];
      const enemyAttacks = enemy.attacks[0];
      const enemyDmg = enemyAttacks.damage;
      friendlyChar.currentHealth = friendlyChar.currentHealth - enemyDmg;
      let currentParty = party;
      currentParty[partyIdx] = friendlyChar;
      setParty([...currentParty]);
    }
  };

  return (
    <CombatContainer>
      <GroupDisplays>
        {<PartyContainer party={party} handleAttack={handleAttack} />}
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
      {enemies.map((enemy, idx) => {
        return (
          <EnemyContainer enemy={enemy} captureEnemy={captureEnemy} key={idx} />
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

const EnemyContainer = ({ enemy, captureEnemy }) => {
  const [enemyUrl, setEnemyUrl] = useState("");
  const getEnemyUrl = async () => {
    const newURL = await getMonsterImage({ name: enemy.name });
    if (newURL.status === "success") {
      setEnemyUrl(newURL.url);
    }
  };
  const cName = enemy.name;
  useEffect(() => {
    getEnemyUrl();
  }, [cName]);

  return (
    <EnemyDisplay>
      {enemyUrl && (
        <img
          src={enemyUrl}
          alt={enemy.name}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      )}
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
};

const EnemyDisplay = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(255, 0, 0, 0.5);
  padding: 20px;
`;

const PartyContainer = ({ party, handleAttack }) => {
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>Attack Name: {attack.name}</div>
                  <button
                    onClick={() => {
                      handleAttack(party.indexOf(member), 0, attack.name);
                    }}
                  >
                    Use Attack
                  </button>
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
