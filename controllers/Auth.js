const UserModel = require("../model/index");
const jwt = require("jsonwebtoken");

const create_token = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "4d" });
};

exports.signup = async (req, res) => {
  const { phoneNumber, userLong, userLat } = req.body;
  try {
    const user = await UserModel.create({
      phoneNumber,
      userLong,
      userLat,
    });
    const token = create_token(user._id);
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(401).json({
      err,
    });
  }
};

exports.findPhone = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await UserModel.findOne({ phoneNumber });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};
