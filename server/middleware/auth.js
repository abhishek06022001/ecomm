const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.json({ msg: "Token isnt set dude" });
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) return res.status(500).json({ msg: "Token isnt correct :(" });
    req.user = user;
    next();
  });
};
module.exports = auth;
