const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Errors } = require("../services/message.service.response");
const { userService } = require("../services/user.service");

//check premium subsctiption
const subscription = asyncHandler(async (req, res, next) => {
  let token;

  try {
    // Get token from header
    token = req.cookies.PRESSURE_AT;

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const { isPremium, endSubscription } = await User.findById(decoded.id);

    const currentTimeStamp = new Date().getTime();
    const endSubscribeTimeStamp = endSubscription.getTime();

    if (isPremium && currentTimeStamp <= endSubscribeTimeStamp) {
      next();
    } else {
      const query = {
        isPremium: false,
        startSubscription: null,
        endSubscription: null,
      };

      await userService.multipleUpdate(decoded.id, query).then(() => {
        throw new Error();
      });
    }
  } catch (error) {
    res
      .status(403)
      .json({ ...Errors.Forbidden, message: "User doen't exists" });
  }

  if (!token) {
    res.status(401).json({ ...Errors.BadRequest, message: "Token expires" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = {
  subscription,
};
