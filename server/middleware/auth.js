const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.json({ msg: "Token isnt set dude" });
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    req.user = user;
    next();
  });
};
module.exports = auth;
