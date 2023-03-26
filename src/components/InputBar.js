import { useState, useContext } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";
import { getActionFromInput } from "../apis/inputAPIs";

export const ImputBar = () => {
  const [playerInput, setPlayerInput] = useState("");

  const {
    setHistory,
    setStateData,
    possibleActions,
    setPossibleActions,
    enemies,
    setEnemies,
    setCurrentEnemy,
    setMode,
    gameId,
    party,
  } = useContext(StateContext);

  const handleSend = async (inputAction = "") => {
    const currentAction = inputAction || playerInput;

    if (!currentAction) return;

    setHistory((prev) => [...prev, { narrative: currentAction, type: "user" }]);

    setPlayerInput("");
    setPossibleActions([]);
    const action = await getActionFromInput({
      playerInput: currentAction,
      gameId,
    });
    if (action.status === "success") {
      setHistory((prev) => [...prev, { ...action?.results, type: "bot" }]);
      setStateData(action?.results?.state);
      setEnemies(action?.results?.monsters || []);
    }
  };

  const attackEnemy = (enemy) => {
    setCurrentEnemy(enemy);
    setMode("combat");
  };

  return (
    <BarContainer>
      <PossibleActionsRow>
        {enemies?.map((enemy, idx) => (
          <EnemiesButton key={idx} enemy={enemy} attackEnemy={attackEnemy} />
        ))}
      </PossibleActionsRow>
      {party?.length > 0 && (
        <>
          <PossibleActionsRow>
            {possibleActions?.map((possibleAction) => (
              <PossibleActionButton
                key={possibleAction}
                action={possibleAction}
                handleSend={handleSend}
              />
            ))}
          </PossibleActionsRow>
          <InputTextArea
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
                e.stopPropagation();
                e.preventDefault();
              }
            }}
          />
          <InputButton
            onClick={() => {
              handleSend();
            }}
          >
            Send
          </InputButton>
        </>
      )}
    </BarContainer>
  );
};

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  //give it a border with box-shadow
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 500px;
  height: 40px;
  align-items: center;
  margin: auto auto 10px auto;
`;

const InputTextArea = styled.textarea`
  width: 400px;
`;

const InputButton = styled.button`
  margin-left: auto;
  margin-right: 10px;
`;

const PossibleActionsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PossibleActionButton = ({ action, handleSend }) => {
  return (
    <ActionButton onClick={() => handleSend(action)}>{action}</ActionButton>
  );
};

const ActionButton = styled.button``;

const EnemiesButton = ({ enemy, attackEnemy }) => {
  return (
    <ActionButton
      style={{
        backgroundColor: "red",
      }}
      onClick={() => attackEnemy(enemy)}
    >
      {enemy.name}
    </ActionButton>
  );
};
