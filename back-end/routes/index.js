var express = require("express");
var router = express.Router();
const dbHandler = require("../utils/dbHandler");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { checkAuth } = require("../utils/checkAuth");

router.post("/register", function (req, res, next) {
  const { username, password, role } = req.body;
  dbHandler.findDocument("user", { username }, (result) => {
    if (!result) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          dbHandler.insertDocument("user", { username, password: hash, role });
          jwt.generate({ username, role }, (token) => {
            res.send(token);
          });
        });
      });
    } else {
      next("route");
    }
  });
});

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  dbHandler.findDocument("user", { username }, (result) => {
    if (result) {
      const check = bcrypt.compareSync(password, result.password);
      if (check) {
        jwt.generate({ username, role: result.role }, (token) => {
          res.json({ username, role: result.role, token });
        });
      } else {
        next("route");
      }
    } else {
      next("route");
    }
  });
});

router.get("/authorization", checkAuth, (req, res) => {
  const { username, role } = req.user;
  res.json({ username, role });
});

router.get("/books", (req, res) => {
  dbHandler.findDocuments("Books", {}, (fRes) => {
    fRes.forEach((e) => {
      delete e._id;
    });
    res.json(fRes);
  });
});
router.get("/categories", (req, res) => {
  dbHandler.findDocuments("Categories", {}, (fRes) => {
    fRes.forEach((e) => {
      delete e._id;
    });
    res.json(fRes);
  });
});

module.exports = router;
