import { useContext, useEffect, useRef } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";

export const HistoryDisplay = () => {
  const { history } = useContext(StateContext);
  const historyRef = useRef(null);

  const historyLength = history.length;
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [historyLength]);

  return (
    <HistoryContainer ref={historyRef}>
      {history.map((message) => {
        return (
          <HistoryMessage key={message.narrative}>
            {message.narrative}
          </HistoryMessage>
        );
      })}
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  //give it a border with box-shadow
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  align-items: center;
  margin: auto auto 10px auto;
`;

const HistoryMessage = styled.div`
  white-space: pre-wrap;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #000000;
  border: 1px solid #000000;
  width: calc(100% - 20px);
`;
