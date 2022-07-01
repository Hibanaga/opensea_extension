const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { userController } = require("../controllers/user.contoller");
const {
  connect,
  verify,
  refreshAccess,
  refresh,
  account,
  updateSubscription,
  checkSubscription,
} = userController;

router.post("/connect", connect);
router.post("/verify", verify);
router.get("/refresh", refreshAccess);
router.get("/refresh-access", refresh);

router.post("/check-subscription", checkSubscription);
router.post("/update-subscription", protect, updateSubscription);
router.get("/account", protect, account);

module.exports = router;
