import { useContext, useEffect, useState } from "react";
import { StateContext } from "../contexts/StateContext";
import { getLocationImage } from "../apis/images";

import styled from "@emotion/styled";

export const ImageBox = () => {
  const { stateData } = useContext(StateContext);
  const [image, setImage] = useState(null);

  const locationName = stateData.location;
  console.log("location name");

  const loadImageFromServer = async () => {
    const image = await getLocationImage(locationName);
    //this returns a base64 string
    setImage(image);
  };

  useEffect(() => {
    if (locationName) {
      loadImageFromServer();
    }
  }, [locationName]);

  return (
    <ImageContainer>
      <img src={image} alt={locationName} />
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
