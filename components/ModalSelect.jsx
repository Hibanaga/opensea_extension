import React, { useEffect, useRef, useState } from "react";
import * as StyledThisComp from "../styles/subscribe.styled";
import DateCounter from "./DateCounter";
import MonthlyPayment from "./MonthlyPayment";
import TotalPayment from "./TotalPayment";
import { calculateDate } from "../utils/calculateDate";
import instance from "../services/http.service";
import { getDiscountPrice } from "../utils/getDiscountPrice";
import { ethers } from "ethers";
import { wait } from "next/dist/build/output/log";

const ModalSelect = ({
  wallet,
  onChangeDate,
  disconnect,
  onToggleSuccess,
  subscriptionEndDate,
}) => {
  const mothlyDescriptionPrice = 0.017;
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [countMonths, setCountMonths] = useState(1);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [intervalRef, timeoutRef]);

  const descriptionNotificationModal = [
    "The subscription does not automatically renew.",
    "You can extend your subscription at any time.",
  ];

  const handleIncrementMonths = () => setCountMonths(countMonths + 1);

  const handleDecrementMonths = () => setCountMonths(countMonths - 1);

  const totalCalculatePrice = getDiscountPrice(
    countMonths,
    mothlyDescriptionPrice * countMonths
  );

  const updateSubscription = async () => {
    const dateSubscribe = !!subscriptionEndDate
      ? new Date(subscriptionEndDate)
      : new Date();

    const endSubscriptionDate = calculateDate(
      dateSubscribe.toISOString().slice(0, 10),
      countMonths
    );

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gasPrice = await provider.getGasPrice();

      const options = {
        to: "0x5F6982208D9084E42eE37E5C41E50d927A7F2cfD",
        from: wallet,
        value: ethers.utils.parseEther(totalCalculatePrice.toString()),
        gasPrice: gasPrice,
      };

      try {
        const response = await signer.sendTransaction(options);
        const interval = setInterval(() => {
          provider.getTransactionReceipt(response.hash).then((txn) => {
            if (!!txn) {
              intervalRef.current = interval;
              instance
                .updateToPremium({
                  startDate: new Date(),
                  endDate: endSubscriptionDate,
                })
                .then((res) => {
                  const { status, endSubscription } = res.data;

                  if (status === 200) {
                    onChangeDate(endSubscription);
                    onToggleSuccess();
                  } else {
                    disconnect();
                  }
                });
              clearInterval(interval);
            }
          });
        }, 1000);

        const timeout = setTimeout(() => {
          timeoutRef.current = timeout;
          clearInterval(interval);
          clearTimeout(timeout);
        }, 60000);
      } catch (e) {
        console.log("Error per minting", e);
      }
    }
  };

  return (
    <>
      <StyledThisComp.Title>Select your subcription plan</StyledThisComp.Title>
      <StyledThisComp.SubTitle>
        Longer subscription = cheaper monthly price
      </StyledThisComp.SubTitle>
      <StyledThisComp.NotificationContent>
        {descriptionNotificationModal.map((description) => (
          <StyledThisComp.NotificationContentItem key={description}>
            {description}
          </StyledThisComp.NotificationContentItem>
        ))}
      </StyledThisComp.NotificationContent>

      <StyledThisComp.Wrapper>
        <DateCounter
          value={countMonths}
          onIncrement={handleIncrementMonths}
          onDecrement={handleDecrementMonths}
        />
        <MonthlyPayment monthlyPrice={mothlyDescriptionPrice} />
        <TotalPayment totalPrice={totalCalculatePrice.toFixed(3)} />
      </StyledThisComp.Wrapper>

      <StyledThisComp.SubscriptionSubmit
        disabled={!countMonths}
        onClick={() => updateSubscription()}
      >
        <StyledThisComp.SubscriptionSubmitContent>
          {!!subscriptionEndDate ? "Extend" : "Get"} Subscription
        </StyledThisComp.SubscriptionSubmitContent>
      </StyledThisComp.SubscriptionSubmit>
    </>
  );
};

export default ModalSelect;
