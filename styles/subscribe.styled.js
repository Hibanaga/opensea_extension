import { themes } from "../utils/themes";
import styled from "styled-components";

export const Container = styled.section`
  min-width: 380px;
  border-radius: 12px;
  background-color: ${themes.colours.white};
  padding: 24px 20px;
`;

export const Title = styled.h1`
  display: block;
  font-weight: 600;
  color: ${themes.colours.ink100};
  font-size: ${themes.fontSizes.tertiaryMiddle}px;
  line-height: 1;
  margin-bottom: 12px;
`;

export const SubTitle = styled.h2`
  line-height: 1;
  color: ${themes.colours.ink200};
  font-size: ${themes.fontSizes.basic}px;
`;

export const NotificationContent = styled.div`
  margin-top: 4px;
`;

export const NotificationContentItem = styled.span`
  display: block;
  line-height: 1.5;
  color: ${themes.colours.ink200};
  font-size: ${themes.fontSizes.secondaryMiddle}px;
`;

export const Wrapper = styled.div`
  border-radius: 8px;
  padding: 12px 16px;
  background-color: ${themes.colours.ink700};
  margin-top: 16px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${themes.colours.borderInk};
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CounterButton = styled.button`
  background-color: ${themes.colours.coral200};
  color: ${themes.colours.white};
  width: 30px;
  height: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 150ms;

  &:hover {
    background-color: ${themes.colours.coral100};
  }

  &:disabled:hover {
    background-color: ${themes.colours.coral200};
  }

  &:first-child {
    margin-right: 12px;
  }

  &:last-child {
    margin-left: 12px;
  }
`;

export const CounterButtonContent = styled.span`
  display: block;
  line-height: 1;
`;

export const CounterContent = styled.span`
  width: 80px;
  text-align: center;
  color: ${themes.colours.ink300};
`;

export const SubscribeDescription = styled.span`
  color: ${themes.colours.ink300};
  font-size: ${themes.fontSizes.basic}px;
`;

export const TotalSubscribeDescription = styled.span`
  font-size: ${themes.fontSizes.basic}px;
  color: ${themes.colours.ink300};
`;

export const TotalPaymentContent = styled.span`
  font-size: ${themes.fontSizes.tertiaryMiddle}px;
  color: ${themes.colours.ink300};
`;

export const MontlyPaymentContent = styled.span`
  color: ${themes.colours.coral100};
`;

export const SubscriptionSubmit = styled.button`
  display: block;
  margin-top: 24px;
  border-radius: 4px;
  padding: 6px;
  width: 100%;
  background-color: ${themes.colours.coral200};
  transition: 150ms;

  &:disabled:hover {
    background-color: ${themes.colours.coral200};
  }

  &:hover {
    background-color: ${themes.colours.coral100};
  }
`;

export const SubscriptionSubmitContent = styled.span`
  color: ${themes.colours.white};
  font-weight: 600;
`;

export const SuccessModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SuccessImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 50%;
  background-color: ${themes.colours.coral400};
`;

export const SuccessModalTitle = styled.h1`
  color: ${themes.colours.ink300};
  font-size: ${themes.fontSizes.tertiary}px;
  margin-top: 16px;
`;

export const SuccessModalSubTitle = styled.h2`
  color: ${themes.colours.ink400};
  font-size: ${themes.fontSizes.basic}px;
  margin-top: 8px;
`;

export const SuccessButtonWrapper = styled.div`
  width: 100%;
  margin-top: 36px;
`;
