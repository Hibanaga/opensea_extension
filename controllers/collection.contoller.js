const { Errors } = require("../services/message.service.response");
const { collectionService } = require("../services/collection.service");
const axios = require("axios");
const contractHelper = require("../dto/contract.information");
// const { watchEvents } = require("../dto/contractInformation");
const Web3 = require("web3");

class CollectionContoller {
  constructor() {}

  async checkAddress(req, res) {
    const collection = req.params.collection;

    if (!collection) {
      res
        .status(400)
        .json({ ...Errors.BadRequest, message: "No Collection added" });
    }

    try {
      const address = await collectionService.getTransactionAddress(collection);

      res.status(200).json({ status: 200, address: address });
    } catch (error) {
      res.status(404).json({ ...Errors.BadRequest, message: "Bad Request" });
    }
  }

  async getInformation(req, res) {
    const collection = req.params.collection;
    const time = req.params.time;

    if (!collection) {
      res
        .status(400)
        .json({ ...Errors.BadRequest, message: "No Collection added" });
    }

    if (!time) {
      res.status(400).json({ ...Errors.BadRequest, message: "No Time added" });
    }

    if (
      time != 1 &&
      time != 5 &&
      time != 10 &&
      time != 15 &&
      time != 30 &&
      time != 60
    ) {
      res
        .status(400)
        .json({ ...Errors.BadRequest, message: "Wrong time parameter" });
    }

    try {
      const address = await collectionService.getTransactionAddress(collection);
      const sales = await collectionService.getSalesInformation(address, time);

      res.status(200).json({ status: 200, sales: sales });
    } catch (error) {
      res.status(400).json({ status: 400, message: "Provides error data" });
    }
  }

  async getListings(req, res) {
    const collection = req.params.collection;
    const time = req.params.time;

    if (!collection) {
      res
        .status(400)
        .json({ ...Errors.BadRequest, message: "No Collection added" });
    }

    if (!time) {
      res.status(400).json({ ...Errors.BadRequest, message: "No Time added" });
    }

    if (
      time != 1 &&
      time != 5 &&
      time != 10 &&
      time != 15 &&
      time != 30 &&
      time != 60
    ) {
      res
        .status(400)
        .json({ ...Errors.BadRequest, message: "Wrong time parameter" });
    }

    try {
      const address = await collectionService.getTransactionAddress(collection);
      const listings = await collectionService.findTransactions(address, time);

      res.status(200).json({ status: 200, message: "success" });
    } catch (e) {
      res.status(400).json({ status: 400, message: "Provides error data" });
    }

    res.status(200).json({ listings: 0 });
  }

  async getTest(req, res) {
    // const result = await contractHelper.watchEvents(contract);

    let address = "0xc99c679c50033bbc5321eb88752e89a93e9e83c5";
    console.log("lower: ", address.toLowerCase());

    let time = 5;

    const listings = await collectionService.findTransactions(address, time);

    res.json({ status: 200, response: listings });
  }
}

module.exports = {
  collectionController: new CollectionContoller(),
};
