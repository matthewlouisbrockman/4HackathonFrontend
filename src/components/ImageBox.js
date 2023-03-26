import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";

import styled from "@emotion/styled";

export const ImageBox = ({ children }) => {
  const { stateData, backgroundImage } = useContext(StateContext);

  const locationName = stateData.location;

  return (
    <ImageContainer>
      <img src={backgroundImage} alt={locationName} />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //give it a border with box-shadow
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`;
