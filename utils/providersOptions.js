import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Fortmatic from "fortmatic";

const INFURA_ID = "48f2681b1f0674ad4825f024d90ae8d62";
const FORTMATIC_ID = "pk_live_F2A71E7F8CD26DE1";

export const providersOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  torus: {
    package: Torus,
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: FORTMATIC_ID,
    },
  },
};
