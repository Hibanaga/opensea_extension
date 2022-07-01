const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {}

  async save(wallet) {
    return await User.create({
      wallet: wallet,
      isPremium: false,
      startSubscription: null,
      endSubscription: null,
      refreshToken: null,
    });
  }

  async find(value, query) {
    return await User.findOne({ [query]: value });
  }

  async update(id, value, query) {
    return await User.findByIdAndUpdate(id, {
      [query]: value,
    });
  }

  async multipleUpdate(id, values) {
    return await User.findByIdAndUpdate(id, values);
  }

  generateToken(accessToken, id) {
    if (accessToken) {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
    } else {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
    }
  }
}

module.exports = {
  userService: new UserService(),
};
