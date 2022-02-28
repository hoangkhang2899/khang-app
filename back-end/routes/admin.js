var express = require("express");
var router = express.Router();
const dbHandler = require("../utils/dbHandler");
const { checkAuth } = require("../utils/checkAuth");
const sendJson = require("../utils/sendJson");

router.use(checkAuth, (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next("router");
  }
});

router.get("/", async (req, res) => {
  res.send("Ok");
});

router.get("/books", (req, res) => {
  dbHandler.findDocuments("Books", {}, (result) => {
    res.json(result);
  });
});
router.get("/orders", (req, res) => {
  dbHandler.findDocuments("Orders", {}, (fRes) => {
    fRes.forEach((e) => delete e._id);
    res.send(fRes);
  });
});
router.post("/addBook", (req, res) => {
  const { book, category, price, describe } = req.body;
  const bookID = category.replace(" ", "").toUpperCase().substr(0, 3);
  dbHandler.findDocument("Books", { book, category }, (fRes) => {
    if (fRes) {
      res.json(sendJson.error("Duplicate book"));
    } else {
      dbHandler.getLastestBookID(bookID, (gRes) => {
        if (gRes.length > 0) {
          const newBookID =
            bookID + String(parseInt(gRes[0].bookID.replace(/^\D+/g, "")) + 1).padStart(3, "0");
          dbHandler.insertDocument(
            "Books",
            { book, bookID: newBookID, category, price, describe },
            (iRes) => {
              res.json(
                sendJson.success({
                  bookID: newBookID,
                })
              );
            }
          );
        } else {
          dbHandler.insertDocument(
            "Books",
            { book, bookID: bookID + "001", category, price, describe },
            (iRes) => {
              res.json(
                sendJson.success({
                  bookID: bookID + "001",
                })
              );
            }
          );
        }
      });
    }
  });
});
router.post("/addCategory", (req, res) => {
  const { category } = req.body;
  dbHandler.insertDocument("Categories", { category }, () => {
    res.json({ category });
  });
});
router.delete("/cancelOrder", (req, res, next) => {
  const { orderID } = req.body;
  dbHandler.findDocument("Orders", { orderID }, (fRes) => {
    if (fRes?.status === "canceling") {
      dbHandler.deleteDocument("Orders", { orderID }, (dRes) => {
        if (dRes.deletedCount > 0) {
          res.send(sendJson.success());
        } else {
          res.send(sendJson.error("Nothing to delete"));
        }
      });
    } else {
      next("router");
    }
  });
});

module.exports = router;
