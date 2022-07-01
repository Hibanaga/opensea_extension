import React, { useState } from "react";
import * as StyledThisComp from "../styles/subscribe.styled";
import ModalSelect from "./ModalSelect";
import SuccessModalMessage from "./SuccessModalMessage";

const SubscribeModal = ({
  wallet,
  provider,
  chainId,
  web3Provider,
  onToggle,
  onChangeDate,
  disconnect,
  subscriptionEndDate,
}) => {
  const [isOpenSuccessMessage, setIsOpenSuccessMessage] = useState(false);

  const handleToggleSuccessMessage = () =>
    setIsOpenSuccessMessage(!isOpenSuccessMessage);

  return (
    <StyledThisComp.Container>
      {isOpenSuccessMessage ? (
        <SuccessModalMessage onClose={onToggle} />
      ) : (
        <ModalSelect
          wallet={wallet}
          provider={provider}
          chainId={chainId}
          web3Provider={web3Provider}
          onChangeDate={onChangeDate}
          onToggleSuccess={handleToggleSuccessMessage}
          disconnect={disconnect}
          subscriptionEndDate={subscriptionEndDate}
        />
      )}
    </StyledThisComp.Container>
  );
};

export default SubscribeModal;
