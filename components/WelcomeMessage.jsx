import React from "react";
import * as StyledThisComp from "../styles/login.styled";
import pressuareIMG from "../public/pressure_icon.png";

const WelcomeMessage = ({ name }) => {
  return (
    <StyledThisComp.ContainerMessage>
      <StyledThisComp.MessageImage
        src={pressuareIMG}
        alt="Pressure"
        width="50"
        height="50"
      />
      <StyledThisComp.MessageTitle>{name}</StyledThisComp.MessageTitle>
    </StyledThisComp.ContainerMessage>
  );
};

export default WelcomeMessage;
