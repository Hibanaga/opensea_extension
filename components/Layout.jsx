import React from "react";
import * as StyledThisComp from "../styles/login.styled";
import WelcomeMessage from "./WelcomeMessage";

const Layout = ({ children, name }) => {
  return (
    <StyledThisComp.Container>
      <StyledThisComp.Row>
        {!!name && <WelcomeMessage name={name} />}
        <StyledThisComp.Wrapper className={!!name ? "connect" : ""}>
          {children}
        </StyledThisComp.Wrapper>
      </StyledThisComp.Row>
    </StyledThisComp.Container>
  );
};

export default Layout;
