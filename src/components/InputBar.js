import { useState, useContext } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";
import { getActionFromInput } from "../apis/inputAPIs";

export const ImputBar = () => {
  const [playerInput, setPlayerInput] = useState("");

  const { setHistory } = useContext(StateContext);

  const handleSend = async () => {
    setHistory((prev) => [...prev, { narrative: playerInput, type: "user" }]);

    setPlayerInput("");
    const action = await getActionFromInput({ playerInput });
    if (action.status === "success") {
      setHistory((prev) => [...prev, { ...action?.results, type: "bot" }]);
    }
  };

  return (
    <BarContainer>
      <InputTextArea
        value={playerInput}
        onChange={(e) => setPlayerInput(e.target.value)}
        //on enter, send the message
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
