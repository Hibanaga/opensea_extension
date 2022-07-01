import React from "react";
import * as StyledSubscribe from "../styles/subscribe.styled";

const MonthlyPayment = ({ monthlyPrice }) => {
  return (
    <StyledSubscribe.Row>
      <StyledSubscribe.SubscribeDescription>
        Monthy price
      </StyledSubscribe.SubscribeDescription>

      <StyledSubscribe.MontlyPaymentContent>
        {monthlyPrice} ETH
      </StyledSubscribe.MontlyPaymentContent>
    </StyledSubscribe.Row>
  );
};

export default MonthlyPayment;
