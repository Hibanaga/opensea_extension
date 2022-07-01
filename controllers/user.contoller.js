const { userService } = require("../services/user.service");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");
const { Errors, Success } = require("../services/message.service.response");
const { stringGenerator } = require("../utils/stringGenerator");

class UserController {
  constructor() {}

  async connect(req, res) {
    const { wallet } = req.body;

    if (!wallet) {
      res.status(400);
      throw new Error("Please add the wallet");
    }

    const user = await userService.find(wallet, "wallet");

    if (user) {
      res.status(201).json({
        nonce: user.nonce,
        ...Success.AlreadyExists,
      });
    } else {
      const newUser = await userService.save(wallet);

      if (newUser) {
        res.status(201).json({
          ...Success.SuccessAdd,
          message: "User created",
          nonce: newUser.nonce,
        });
      } else {
        res.status(400).json(Errors.BadRequest);
        throw new Error("Invalid User Data");
      }
    }
  }

  async verify(req, res) {
    const { wallet, signature } = req.body;

    if (!wallet || !signature) {
      res.status(400).json(Errors.BadRequest);
      throw new Error("Parameters missing");
    }

    const user = await userService.find(wallet, "wallet");

    if (user) {
      const existingNonce = user.nonce;
      const message = `Welcome to Pressure!
        
Signing this message is the only way we can truly know that you are the owner of the wallet you are connecting. Signing is a safe, gas-less transaction that does NOT in any way give Pressure permission to perform any transactions with your wallet.
     
Wallet address:
${wallet}
     
Nonce:
${existingNonce}`;

      const recoveredWallet = ethers.utils.verifyMessage(message, signature);

      if (recoveredWallet === wallet) {
        const newNonce = stringGenerator();
        const accessToken = userService.generateToken(true, user._id);
        const refreshToken = userService.generateToken(false, user._id);
        user.nonce = newNonce;
        user.refreshToken = refreshToken;
        await user.save().then(
          res
            .cookie("PRESSURE_AT", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 900000,
            })
            .cookie("PRESSURE_RT", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
              maxAge: 86400000,
            })
            .status(200)
            .json({
              ...Success.SuccessUpdate,
              message: "Signature verified",
            })
        );
      } else {
        res.status(401).json(Errors.BadRequest);
      }
    } else {
      res.status(500).json(Errors.InternalServerError);
    }
  }

  async refreshAccess(req, res) {
    if (!req.cookies.PRESSURE_AT || !req.cookies.PRESSURE_RT) {
      return res.status(401).json(Errors.BadRequest);
    }

    const refreshToken = req.cookies.PRESSURE_RT;

    const user = await userService.find(refreshToken, "refreshToken");

    if (user) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (user._id.toString() === decoded.id) {
        const newRefreshToken = userService.generateToken(false, decoded.id);

        await userService
          .update(decoded.id, newRefreshToken, "refreshToken")
          .then(() => {
            res
              .cookie("PRESSURE_RT", newRefreshToken, {
                httpOnly: true,
                secure: true, //process.env.NODE_ENV === "production",
                sameSite: "none",
                overwrite: true,
                maxAge: 86400000, //86400000, // 1 day
              })
              .status(200)
              .json({
                ...Success.SuccessUpdate,
                message: "refresh token updated",
              });
          });
      } else {
        res.status(401).json({ ...Errors.BadRequest, message: "JWT error" });
      }
    } else {
      res
        .status(401)
        .json({ ...Errors.BadRequest, message: "User doesn't exist" });
    }
  }

  async checkSubscription(req, res) {
    const { wallet } = req.body;

    try {
      const { endSubscription } = await userService.find(wallet, "wallet");

      res.json({
        ...Success.SuccessGet,
        endSubscription,
      });
    } catch (e) {
      res.json({ ...Errors.Forbidden, message: "Provide wrong data" });
    }
  }

  async refresh(req, res) {
    if (!req.cookies.PRESSURE_RT) {
      return res.status(401).json({
        ...Errors.BadRequest,
        message: "Refresh token has been expires",
      });
    }

    const refreshToken = req.cookies.PRESSURE_RT;

    const user = await userService.find(refreshToken, "refreshToken");

    if (user) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (user._id == decoded.id) {
        const newAccessToken = userService.generateToken(true, user._id);

        res
          .cookie("PRESSURE_AT", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 900000,
          })
          .status(200)
          .json({
            ...Success.SuccessUpdate,
            message: "Token refreshed",
          });
      } else {
        res
          .status(403)
          .json({ ...Errors.Forbidden, message: "User doen't exist" });
      }
    } else {
      res
        .status(403)
        .json({ ...Errors.Forbidden, message: "User doen't exist" });
    }
  }

  async account(req, res) {
    const { id } = req.user;

    const { _id, wallet } = await userService.find(id, "_id");

    res.status(200).json({
      id: _id,
      wallet,
    });
  }

  async updateSubscription(req, res) {
    if (!req.cookies.PRESSURE_AT || !req.cookies.PRESSURE_RT) {
      return res.status(401).json({
        ...Errors.BadRequest,
        message: "Refresh or Access token has been expires",
      });
    }

    const { startDate, endDate } = req.body;

    const refreshToken = req.cookies.PRESSURE_RT;

    const user = await userService.find(refreshToken, "refreshToken");

    if (user) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const query = user.isPremium
        ? { endSubscription: endDate }
        : {
            isPremium: true,
            startSubscription: startDate,
            endSubscription: endDate,
          };

      await userService.multipleUpdate(decoded.id, query);

      const { endSubscription } = await userService.find(decoded.id, "_id");

      res.status(200).json({
        ...Success.SuccessUpdate,
        messsage: "subscription updated",
        endSubscription,
      });
    } else {
      res.status(401).message({
        ...Errors.BadRequest,
        messasge: "User doen't exists",
      });
    }
  }
}

module.exports = {
  userController: new UserController(),
};
