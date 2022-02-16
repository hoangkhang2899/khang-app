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
  res.send("Ok")
});

router.get("/books", (req, res) => {
  dbHandler.findDocuments("Books", {}, (result) => {
    res.json(result);
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
            bookID +
            String(parseInt(gRes[0].bookID.replace(/^\D+/g, "")) + 1).padStart(
              3,
              "0"
            );
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
//   dbHandler.insertDocument("Books", { book, category }, (result) => {
//     console.log(ObjectId(result.insertedId).toString())
//     res.json({ book });
//   });
// });
router.post("/addCategory", (req, res) => {
  const { category } = req.body;
  dbHandler.insertDocument("Categories", { category }, () => {
    res.json({ category });
  });
});

module.exports = router;
