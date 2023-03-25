import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";

export const StateDisplay = () => {
  const { stateData } = useContext(StateContext);

  return (
    <StateContainer>
      {stateData.location && <div>Location: {stateData.location}</div>}
    </StateContainer>
  );
};

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  //give it a border with box-shadow
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
`;
