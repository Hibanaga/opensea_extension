const mongoose = require("mongoose");
const { stringGenerator } = require("../utils/stringGenerator");

const userSchema = mongoose.Schema(
  {
    nonce: {
      type: String,
      default: stringGenerator(),
    },
    wallet: {
      type: String,
      required: [true, "Please add your wallet address"],
      unique: true,
    },
    refreshToken: {
      type: String,
      unique: true,
    },
    isPremium: {
      type: Boolean,
    },
    startSubscription: {
      type: Date,
    },
    endSubscription: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
