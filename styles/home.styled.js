import { themes } from "../utils/themes";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  width: 100%;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px solid ${themes.colours.ink600};
`;

export const RowAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px 16px 16px;
`;

export const ActionWrapper = styled.div`
  margin: 4px;
`;

export const Title = styled.h1`
  padding: 16px 24px;
  font-size: ${themes.fontSizes.tertiary}px;
`;

export const Wrapper = styled.div`
  padding: 24px;
  width: 50%;

  &:nth-child(2) {
    padding-left: 60px;
  }

  &:last-child {
    padding-top: 0;
  }
`;

export const Description = styled.span`
  display: block;
  font-size: ${themes.fontSizes.secondary}px;
  color: ${themes.colours.ink400};
  font-weight: 300;

  &:first-letter {
    text-transform: uppercase;
  }
`;

export const Content = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 4px 8px 4px 0;
  font-size: ${themes.fontSizes.basic}px;
  font-weight: 300;
  transition: 150ms;

  &.subscribed {
    padding: 4px 12px;
    border-radius: 8px;
  }

  &.subscribed.no {
    color: ${themes.colours.red100};
    background-color: ${themes.colours.red200};
  }
  &.subscribed.yes {
    color: ${themes.colours.coral300};
    background-color: ${themes.colours.coral400};
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${themes.colours.coral200};
  font-size: ${themes.fontSizes.secondary}px;
  color: ${themes.colours.white};
  font-weight: 400;
  transition: 150ms;
  border-radius: 8px;
  width: inherit;

  &:hover {
    background-color: ${themes.colours.coral100};
  }
`;

export const ButtonContent = styled.span``;

export const SubscriptionInfo = styled.span`
  font-size: ${themes.fontSizes.basic}px;
  color: ${themes.colours.ink100};
`;

export const ConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConnectButton = styled.button`
  padding: 8px 16px;
  background-color: ${themes.colours.coral200};
  font-size: ${themes.fontSizes.secondary}px;
  color: ${themes.colours.white};
  font-weight: 400;
  width: 250px;
  transition: 150ms;
  border-radius: 8px;

  &:hover {
    background-color: ${themes.colours.coral100};
  }
`;
