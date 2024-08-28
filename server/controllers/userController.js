const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const isRegistered = await User.findOne({ email });
      if (isRegistered) {
        return res.json({ msg: "Already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      // console.log("accesstoken is", accessToken);
      // console.log("refreshToken is", refreshToken);
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
      });
      return res.json({ accessToken });
    } catch (error) {
      return res.json({ msg: error.msg });
    }
  },
  refreshToken: async (req, res) => {
    // returns access Token when needed dude  in the frontend
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) {
        return res.status(401).json({ msg: "No refresh token provided" });
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          return res.json({ msg: "Some error , refresh token not verified" });
        }
        const accessToken = createAccessToken({ id: user.id });

        return res.json({ accessToken });
      });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User not exist" });
        bcrypt.compare(password, user.password, (err, data) => {
          if (err) throw err;
          if (data) {
            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              path: "/users/refresh_token",
            });
            return res.status(200).json({ accessToken });
          } else {
            return res.status(401).json({ msg: "Invalid credencial" });
          }
        });
      });
    } catch (err) {
      return res.json({ msg: error.msg });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/users/refresh_token" });
      return res.json({ msg: "logged out dude" });
    } catch (err) {
      return res.json({ msg: error.msg });
    }
  },
  information: async (req, res) => {
    try {
      // console.log(req.user);
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      return res.json(user);
    } catch (err) {}
  },
};
const createAccessToken = (payload) => {
  const jwtsecretkey = process.env.ACCESS_TOKEN;
  const token = jwt.sign(payload, jwtsecretkey, {
    expiresIn: "1d",
  });
  return token;
};

const createRefreshToken = (payload) => {
  const jwtsecretkey = process.env.REFRESH_TOKEN;
  const token = jwt.sign(payload, jwtsecretkey, {
    expiresIn: "7d",
  });
  return token;
};
module.exports = userController;
