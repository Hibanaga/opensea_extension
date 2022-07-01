import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState } from "react";
import Image from "next/image";
import instance from "../services/http.service";

const injected = new InjectedConnector();

export default function _Home() {
  const [signatures, setSignatures] = useState([]);
  const { active, account, activate, library: provider } = useWeb3React();

  const signMessage = async () => {
    if (active) {
      let nonce;

      try {
        const res = await instance.setSignMessage({ wallet: account });
        nonce = res.data.nonce;
        console.log(res.data.nonce);
      } catch (error) {
        console.log(error);
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("address: " + address);
      const signature = await signer.signMessage(`${nonce.toString()}`); //`0x${toHex(nonce.toString())}` +message)

      return {
        signature,
        address,
      };
    }
  };

  const handleSign = async (e) => {
    const message = await signMessage();

    if (message) {
      console.log(message, "message handleSign");

      console.log("message-signature: " + message.signature);
      console.log("message-address: " + message.address);

      try {
        const res = await instance.verifyUser({
          wallet: message.address,
          signature: message.signature,
        });

        if (res.status == 200) {
          const wallet = await getAccount();
          console.log("Verified! " + wallet);
        }
      } catch (error) {
        console.log(error);
      }

      setSignatures([...signatures, message.signature]);
    }
  };

  const getAccount = async (e) => {
    console.log("getAccount");

    try {
      const res = await instance.getAccount();

      console.log(res.data);

      if (res.status == 200) {
        return res.data.wallet;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRefreshToken = async () => {
    console.log("getRefreshToken");

    try {
      const res = await instance.getRefreshToken();
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  function toHex(stringToConvert) {
    return stringToConvert
      .split()
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  }

  async function connect() {
    try {
      await activate(injected);

      console.log(injected, "injected");

      console.log(active, "active");
      if (active) {
        await handleSign();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Image
                className="mx-auto h-12 w-auto"
                src="/pressure_icon.png"
                alt="Pressure"
                width="50"
                height="50"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-6">
                <div>
                  {active ? (
                    <>
                      <p>Your connected!</p>
                      <button onClick={() => handleSign()}>Sign Message</button>
                      <br />
                      {/*signatures.map((message, idx) => {
                        return (
                          <div className="p-2" key={message}>
                            <p>Signer: {message.address}</p>
                            <p>Signature: {message.signature}</p>
                          </div>
                        );
                      })*/}
                      <button onClick={() => getAccount()}>Get Account</button>

                      <br />
                      <button onClick={() => getRefreshToken()}>
                        Refresh Access Token
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => connect()}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
