var express = require("express");
var router = express.Router();
const dbHandler = require("../utils/dbHandler");
const { checkAuth } = require("../utils/checkAuth");
const sendJson = require("../utils/sendJson");

router.use(checkAuth, (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    next("router");
  }
});

router.post("/", async (req, res, next) => {
  const { cart } = req.body;
  const { username } = req.user;
  if (cart.length > 0) {
    const result = await dbHandler.getLastestOrderID();
    const nextOrderID = String(parseInt(result) + 1 || "0001").padStart(4, "0");
    const insertObj = {
      orderID: nextOrderID,
      username,
      item: cart,
      status: "pending",
    };
    dbHandler.insertDocument("Orders", insertObj, () => {
      res.send(
        sendJson.success({
          orderID: nextOrderID,
        })
      );
    });
  } else {
    next("router");
  }
});

module.exports = router;
