const express = require("express");
const router = express.Router();
const { collectionController } = require("../controllers/collection.contoller");
const { protect } = require("../middleware/authMiddleware");
const { subscription } = require("../middleware/subscribeMiddleware");

const { getInformation, checkAddress, getListings, getTest } =
  collectionController;

router.get("/:collection/check-address", checkAddress);
router.get(
  "/:collection/information/:time",
  protect,
  subscription,
  getInformation
);
router.get("/:collection/listings/:time", protect, subscription, getListings);
router.get("/test", getTest);

module.exports = router;
