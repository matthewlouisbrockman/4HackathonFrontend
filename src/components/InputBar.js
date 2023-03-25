import { useState, useContext } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";

export const ImputBar = () => {
  const [input, setInput] = useState("");

  const { setHistory } = useContext(StateContext);

  const handleSend = () => {
    setHistory((prev) => [...prev, { text: input, type: "user" }]);
    setInput("");
  };

  return (
    <BarContainer>
      <InputTextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
