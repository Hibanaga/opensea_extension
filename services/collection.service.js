const axios = require("axios");
const Transactions = require("../models/transaction.model");

class CollectionService {
  constructor() {}

  async getTransactionAddress(collection) {
    let config = {
      headers: {
        Accept: "application/json",
        "X-API-KEY": process.env.OPENSEA_API_KEY,
      },
    };

    let url = `https://api.opensea.io/api/v1/assets?collection_slug=${collection}&order_direction=desc&limit=1&include_orders=false`;

    const result = await axios(url, config);

    return result.data.assets[0].asset_contract.address;
  }

  async findTransactions(address, time) {
    // console.log("address: ", address);
    // taker
    // maker
    // 0xee684742a4656f8096410bcdd708ed293caf14bb7b2fafb1cdf4ad9849466f21

    const transactions = await Transactions.find({
      $or: [
        { maker: address },
        { taker: address },
        // {
        //   sellHash:
        //     "0xee684742a4656f8096410bcdd708ed293caf14bb7b2fafb1cdf4ad9849466f21",
        // },
        // {
        //   transactionHash:
        //     "0x4fa308b20d68ba19dcd2e1c88ab4fd70295a9095b085a49c211fae95fb725dee",
        // },
      ],
    });

    return transactions;
  }

  async getSalesInformation(address, time) {
    let config = {
      headers: {
        Accept: "application/json",
        "X-API-KEY": process.env.MORALIS_API_KEY,
      },
    };

    const fromDate = new Date(
      new Date().getTime() - time * 60 * 1000
    ).toISOString();

    try {
      let url = `https://deep-index.moralis.io/api/v2/nft/${address}/trades?chain=eth&from_date=${fromDate}&marketplace=opensea&limit=200`;

      const result = await axios.get(url, config);

      return result.data.result.length;
    } catch (error) {}
  }

  async getListingsInformation(address, time) {
    let config = {
      headers: {
        Accept: "application/json",
        "X-API-KEY": process.env.OPENSEA_API_KEY,
      },
    };

    let queryTime = new Date();
    queryTime.setMinutes(queryTime.getMinutes() - parseInt(time));
    queryTime = Math.floor(queryTime.getTime() / 1000);

    let limitNotReached = true;
    let listings = 0;
    let events = 0;
    let next = "";

    while (limitNotReached) {
      let url = `https://api.opensea.io/api/v1/events?only_opensea=false&event_type=created&collection_slug=${address}&occurred_after=${queryTime}&cursor=${next}`;

      try {
        const res = await axios.get(url, config);
        events = res.data.asset_events.length;
        listings += events;
        next = res.data.next;

        if (next == null) {
          limitNotReached = false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return listings;
  }
}

module.exports = {
  collectionService: new CollectionService(),
};
