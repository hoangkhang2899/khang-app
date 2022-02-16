const jwt = require("./jwt");

module.exports = {
  checkAuth(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, (decoded) => {
      if (decoded) {
        req.user = {
          username: decoded.username,
          role: decoded.role,
        };
        next();
      } else {
        next("route");
      }
    });
  },
};
