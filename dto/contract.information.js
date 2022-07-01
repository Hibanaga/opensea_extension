const Web3 = require("web3");
const Transaction = require("../models/transaction.model");
const got = (...args) =>
  import("got").then(({ default: fetch }) => fetch(...args));

const infuraMainnet = "wss://mainnet.infura.io/ws/v3/";
const infuraProjectID = "8f2681b1f0674ad4825f024d90ae8d62";
// const infuraSecretKey = "2466a7774b884466b7c155aafdebb9c0";
const etherscanAPIKey = "UFJQ4URMUGCWQM2ISMQFY69VZWWZA82GME";

const web3 = new Web3(`${infuraMainnet}${infuraProjectID}`);

async function getContractABI(contractAddress) {
  let opts = {
    url: `http://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanAPIKey}`,
    responseType: "json",
  };

  try {
    let response = await got(opts);
    return response.body;
  } catch (e) {
    console.log(e);
  }
}

const subscribeLogEvent = async (contract, eventName) => {
  const eventJsonInterface = contract._jsonInterface.find(
    (option) => option.name === eventName
  );

  // const randomThing = web3.eth.abi.encodeEventSignature(
  //   "OrdersMatched(bytes32,address,address,address,uint256)"
  // );
  //0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9
  // console.log("randomThing: ", randomThing);

  try {
    let blockNumber = null;
    let transactionHash = null;

    web3.eth.subscribe(
      "logs",
      {
        address: contract.options.address,
        // topics: [randomThing],
        topics: [eventJsonInterface.signature],
      },
      async (error, result) => {
        // result:  {
        //   removed: false,
        //       logIndex: 641,
        //       transactionIndex: 288,
        //       transactionHash: '0x4129ebefbe99dcbf9579f48c27010b9ec66ff91d1dd5cc16c14760c3b92e12ba',
        //       blockHash: '0x3dbe48a2a57c8fc79041cee5c6059f025d2c1a590eaddf683cbff2820247cf0a',
        //       blockNumber: 14871491,
        //       address: '0x7f268357A8c2552623316e2562D90e642bB538E5',
        //       data: '0x00000000000000000000000000000000000000000000000000000000000000009cdd676774086c0e2d20b91551ab76b5660862e0552fe3cdf233533133c306c500000000000000000000000000000000000000000000000000470de4df820000',
        //       topics: [
        //     '0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9',
        //     '0x000000000000000000000000e3dfb1bdec6d5832c710154935fdccf79822ac31',
        //     '0x0000000000000000000000002692c94b54387541ae016f444b0189cd99e5e752',
        //     '0x0000000000000000000000000000000000000000000000000000000000000000'
        //   ],
        //       id: 'log_7af2a622'
        // }

        if (!error) {
          blockNumber = result.blockNumber;
          transactionHash = result.transactionHash;
          const eventObj = web3.eth.abi.decodeLog(
            eventJsonInterface.inputs,
            result.data,
            result.topics.slice(1)
          );
          // console.log("eventObj: ", eventObj);
          //   buyHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
          //   sellHash: '0x6c330db262945924702d99c45a31631188b47a94dcb7968763b5a9309c56336a',
          //   maker: '0x34E0Fa20dfEdc5558dE8a3f4e00203D7f49D7098',
          //   taker: '0x056Ac9EA2962f5cD274b073cD2be7343B426C5dc',
          //   price: '58000000000000000',
          //   metadata: '0x0000000000000000000000000000000000000000000000000000000000000000'

          const { buyHash, sellHash, maker, taker } = eventObj;

          let blockNumberProps = await web3.eth.getBlock(blockNumber);
          let timeStamp = blockNumberProps.timestamp;
          let date = new Date(timeStamp * 1000).toISOString();

          await Transaction.create({
            date: date,
            transactionHash: transactionHash,
            buyHash: buyHash,
            sellHash: sellHash,
            maker: maker.toLowerCase(),
            taker: taker.toLowerCase(),
            // topics: result.topics,
          });
        }
      }
    );
  } catch (e) {}
};

async function watchEvents() {
  let contractAddress = "0x7f268357a8c2552623316e2562d90e642bb538e5";

  let contractABI = await getContractABI(contractAddress);

  const contract = new web3.eth.Contract(
    JSON.parse(contractABI.result),
    contractAddress
  );

  // console.log("contract: ", contract);

  // let address = "0xd8a5d498ab43ed060cb6629b97a19e3e4276dd9f";
  // let hash = web3.utils.keccak256(address);
  // console.log("hash: ", hash);

  try {
    await subscribeLogEvent(contract, "OrdersMatched");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  watchEvents,
};
