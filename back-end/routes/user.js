const express = require("express");
const router = express.Router();
const { checkAuth } = require("../utils/checkAuth");
const dbHandler = require("../utils/dbHandler");
const sendJson = require("../utils/sendJson");

router.use(checkAuth, (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    next("router");
  }
});

router.get("/orderHistory", (req, res) => {
  dbHandler.findDocuments("Orders", { username: req.user.username }, (fRes) => {
    if (fRes) {
      fRes.forEach((e) => {
        delete e._id;
        delete e.username;
      });
      res.send(sendJson.success({ orders: fRes }));
    } else {
      res.send(sendJson.error("No order found"));
    }
  });
});

module.exports = router;
