const User = require("../models/userModel");
const authAdmin = async (req, res, next) => {
  try {
    const role = await User.findOne({ _id: req.user.id }).select("role");
    if (role == 0) {
      return res.status(400).json({ msg: "Not an admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = authAdmin;
