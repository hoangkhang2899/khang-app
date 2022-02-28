const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;
const options = {};

module.exports = {
  generate: (obj, callback = (token) => {}) => {
    jwt.sign({ obj }, secretKey, options, (err, token) => {
      callback(token);
    });
  },
  verify: (token, callback = (decoded) => {}) => {
    token = token?.replace("Bearer ", "");
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        const name = Object.keys(decoded)[0];
        callback(decoded[name]);
      } else {
        callback();
      }
    });
  },
};
