import React from "react";
import doneIMG from "../public/done-icon.svg";
import Image from "next/image";
import * as StyledThisComp from "../styles/subscribe.styled";
import BaseButton from "./BaseButton";

const SuccessModalMessage = ({ onClose }) => {
  return (
    <StyledThisComp.SuccessModalContainer>
      <StyledThisComp.SuccessImage>
        <Image src={doneIMG} alt="alt done image" width="24" height="24" />
      </StyledThisComp.SuccessImage>

      <StyledThisComp.SuccessModalTitle>
        Payment successful
      </StyledThisComp.SuccessModalTitle>
      <StyledThisComp.SuccessModalSubTitle>
        Have fun and success with the extension!
      </StyledThisComp.SuccessModalSubTitle>

      <StyledThisComp.SuccessButtonWrapper>
        <BaseButton content="Go back to dashboard" onClick={onClose} />
      </StyledThisComp.SuccessButtonWrapper>
    </StyledThisComp.SuccessModalContainer>
  );
};

export default SuccessModalMessage;
