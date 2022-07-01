import React from "react";
import * as StyledSubscribe from "../styles/subscribe.styled";

const DateCounter = ({ value, onIncrement, onDecrement }) => {
  return (
    <StyledSubscribe.Row>
      <StyledSubscribe.SubscribeDescription>
        Duration
      </StyledSubscribe.SubscribeDescription>

      <StyledSubscribe.CounterWrapper>
        <StyledSubscribe.CounterButton disabled={!value} onClick={onDecrement}>
          <StyledSubscribe.CounterButtonContent>
            -
          </StyledSubscribe.CounterButtonContent>
        </StyledSubscribe.CounterButton>
        <StyledSubscribe.CounterContent>
          {value} months
        </StyledSubscribe.CounterContent>
        <StyledSubscribe.CounterButton onClick={onIncrement}>
          <StyledSubscribe.CounterButtonContent>
            +
          </StyledSubscribe.CounterButtonContent>
        </StyledSubscribe.CounterButton>
      </StyledSubscribe.CounterWrapper>
    </StyledSubscribe.Row>
  );
};

export default DateCounter;
