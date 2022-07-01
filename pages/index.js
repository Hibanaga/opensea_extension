import React, { useEffect, useReducer, useState } from "react";
import instance from "../services/http.service";
import { providers } from "ethers";
import Web3Modal from "web3modal";
import { providersOptions } from "../utils/providersOptions";
import { initialState, reducer } from "../utils/reducerContext";
import * as StyledThisComp from "../styles/home.styled";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: false,
    providerOptions: providersOptions,
    disableInjectedProvider: false,
  });
}

const Home = () => {
  const [subscribeExpireDate, setSubscribeExpireDate] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address } = state;

  const connect = async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      const resultSubscription = await instance.checkSubscription({
        wallet: address,
      });

      const { endSubscription } = resultSubscription.data;

      setSubscribeExpireDate(endSubscription);

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });

      if (address) {
        await handleSign();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    address ? handleSign() : disconnect();
  }, [address]);

  const disconnect = async () => {
    setIsConnect(false);
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }
    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const signMessage = async () => {
    let nonce;

    try {
      if (address) {
        try {
          const res = await instance.setSignMessage({ wallet: address });

          nonce = res.data.nonce;
        } catch (error) {
          console.error(error);
        }

        const message = `Welcome to Pressure!
        
Signing this message is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does NOT in any way give Pressure permission to perform any transactions with your wallet.
     
Wallet address:
${address}
     
Nonce:
${nonce.toString()}`;

        const signer = web3Provider.getSigner();
        const signature = await signer.signMessage(message);

        return {
          signature,
          address,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSign = async () => {
    const message = await signMessage();

    try {
      if (message) {
        const res = await instance.verifyUser({
          wallet: message.address,
          signature: message.signature,
        });

        if (res.status == 200) {
          const wallet = await getAccount();
          console.log("Verified! " + wallet);
          setIsConnect(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAccount = async () => {
    try {
      const res = await instance.getAccount();

      console.log("account: ", res.data);

      if (res.status == 200) {
        return res.data.wallet;
      }
    } catch (error) {
      disconnect();
      console.log(error);
    }
  };

  const handleUpdateExpireDate = (newDate) => setSubscribeExpireDate(newDate);

  return (
    <>
      <Layout name={!isConnect ? "Welcome to Pressure!" : ""}>
        {isConnect ? (
          <Dashboard
            wallet={address}
            web3Provider={web3Provider}
            subscription={subscribeExpireDate}
            onHandleSign={() => handleSign()}
            onGetAccount={() => getAccount()}
            onHandleUpdateExireDate={handleUpdateExpireDate}
            disconnect={() => disconnect()}
          />
        ) : (
          <StyledThisComp.ConnectWrapper>
            <StyledThisComp.ConnectButton
              onClick={() => connect()}
              type="submit"
            >
              Connect Wallet
            </StyledThisComp.ConnectButton>
          </StyledThisComp.ConnectWrapper>
        )}
      </Layout>
    </>
  );
};

export default Home;
