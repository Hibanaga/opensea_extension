import React from "react";
import * as StyledHome from "../styles/home.styled";

const BaseButton = ({ onClick, content }) => {
  return (
    <StyledHome.Button onClick={onClick}>
      <StyledHome.ButtonContent>{content}</StyledHome.ButtonContent>
    </StyledHome.Button>
  );
};

export default BaseButton;
