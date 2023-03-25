import { useState } from "react";

import styled from "@emotion/styled";

export const HistoryDisplay = () => {
  const [history, setHistory] = useState([]);

  return (
    <HistoryContainer>
      {history.map((message) => {
        return <HistoryMessage>{JSON.stringify(message)}</HistoryMessage>;
      })}
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: row;
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
`;
