import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";

export const HistoryDisplay = () => {
  const { history } = useContext(StateContext);
  const historyRef = useRef(null);
  const [lastMessageType, setLastMessageType] = useState(null);

  const historyLength = history.length;
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
    if (history.length > 0) {
      setLastMessageType(history[history.length - 1].type);
    }
  }, [historyLength]);

  return (
    <HistoryContainer ref={historyRef}>
      {history.map((message) => {
        return message.type === "user" ? (
          <UserHistoryMessage key={message.narrative}>
            {message.narrative}
          </UserHistoryMessage>
        ) : (
          <BotHistoryMessage key={message.narrative}>
            {message.narrative}
          </BotHistoryMessage>
        );
      })}
      {lastMessageType === "user" && (
        <EngineRunningMessage>
          Waiting for LLM game engine...
        </EngineRunningMessage>
      )}
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  align-items: center;
  margin: auto auto 10px auto;
`;

const baseMessageStyles = `
  white-space: pre-wrap;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #000000;
`;

const UserHistoryMessage = styled.div`
  ${baseMessageStyles}
  background-color: #e0f7fa;
  color: #000000;
  width: auto;
  max-width: calc(100% - 20px);
  margin-left: auto;
`;

const BotHistoryMessage = styled.div`
  ${baseMessageStyles}
  background-color: #f0f0f0;
  color: #000000;
  width: auto;
  max-width: calc(100% - 20px);
  margin-right: auto;
`;

const EngineRunningMessage = styled.div`
  white-space: pre-wrap;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  font-style: italic;
  color: #ff0000;
  width: auto;
  max-width: calc(100% - 20px);
  margin-right: auto;
`;
