import React, { useState } from "react";
import * as StyledThisComp from "../styles/home.styled";
import instance from "../services/http.service";
import { getConvertedExpireDate } from "../utils/getConvertedExpireDate";
import ModalTransitionWrapper from "./ModalTransitionWrapper";
import SubscribeModal from "./SubscribeModal";
import BaseButton from "./BaseButton";

const Dashboard = ({
  wallet,
  web3Provider,
  subscription,
  onHandleSign,
  onGetAccount,
  onHandleUpdateExireDate,
  disconnect,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getRefreshAccessToken = async () => {
    try {
      const res = await instance.getRefreshAccessToken();
      console.log("access token: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRefreshToken = async () => {
    try {
      const res = await instance.getRefreshToken();
      console.log("refresh token: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleModal = () => setIsOpenModal(!isOpenModal);

  const accountInformation = [
    { propName: "wallet", propValue: wallet },
    { propName: "subscribed", propValue: !!subscription },
    {
      propName: "expiry Date of Subscription",
      propValue: getConvertedExpireDate(subscription),
    },
  ];

  const actionButtons = [
    {
      content: `${!!subscription ? "Extend" : "Get"} Subscription`,
      action: handleToggleModal,
    },
  ];

  return (
    <StyledThisComp.Container>
      <StyledThisComp.Title>Account Information</StyledThisComp.Title>

      <StyledThisComp.Row>
        {accountInformation.map(({ propName, propValue }) => (
          <StyledThisComp.Wrapper key={propName}>
            <StyledThisComp.Description>{propName}</StyledThisComp.Description>
            <StyledThisComp.Content
              className={`${propName.split(" ")[0]} ${
                typeof propValue === "boolean" && propValue ? "yes" : "no"
              }`}
            >
              {typeof propValue === "boolean"
                ? propValue
                  ? "yes"
                  : "no"
                : propValue}
            </StyledThisComp.Content>
          </StyledThisComp.Wrapper>
        ))}
      </StyledThisComp.Row>

      <StyledThisComp.RowAction>
        {actionButtons.map(({ content, action }) => (
          <StyledThisComp.ActionWrapper key={content}>
            <BaseButton content={content} onClick={action} />
          </StyledThisComp.ActionWrapper>
        ))}
      </StyledThisComp.RowAction>

      <ModalTransitionWrapper isOpen={isOpenModal} onToggle={handleToggleModal}>
        <SubscribeModal
          wallet={wallet}
          web3Provider={web3Provider}
          onToggle={handleToggleModal}
          disconnect={disconnect}
          onChangeDate={onHandleUpdateExireDate}
          subscriptionEndDate={subscription}
        />
      </ModalTransitionWrapper>
    </StyledThisComp.Container>
  );
};

export default Dashboard;
