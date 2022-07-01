import { themes } from "../utils/themes";
import styled from "styled-components";
import Image from "next/image";

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${themes.colours.ink700};
`;

export const Row = styled.div``;

export const Wrapper = styled.div`
  background-color: ${themes.colours.white};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 32px;

  &.connect {
    padding: 24px;
  }
`;

export const ContainerMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MessageImage = styled(Image)`
  margin: 0 auto;
`;

export const MessageTitle = styled.h1`
  margin: 16px 0 30px 0;
  font-weight: 600;
  font-size: ${themes.fontSizes.fourfoldQuarter}px;
  cursor: default;
`;
