const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { Errors } = require("../services/message.service.response");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  let refreshToken;

  try {
    // Get token from header
    token = req.cookies.PRESSURE_AT;
    refreshToken = req.cookies.PRESSURE_RT;
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);
    const { refreshToken: dbRefreshToken } = req.user;

    if (!!req.user && refreshToken === dbRefreshToken) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res
      .status(401)
      .json({ ...Errors.BadRequest, message: "User doesn't exists" });
    throw new Error("Not authorized");
  }

  if (!token) {
    res
      .status(401)
      .json({ ...Errors.BadRequest, message: "User doesn't exists" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
