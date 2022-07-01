import React from "react";
import * as StyledSubscribe from "../styles/subscribe.styled";

const TotalPayment = ({ totalPrice }) => {
  return (
    <StyledSubscribe.Row>
      <StyledSubscribe.TotalSubscribeDescription>
        One time total payment
      </StyledSubscribe.TotalSubscribeDescription>
      <StyledSubscribe.TotalPaymentContent>
        {totalPrice} ETH
      </StyledSubscribe.TotalPaymentContent>
    </StyledSubscribe.Row>
  );
};

export default TotalPayment;
