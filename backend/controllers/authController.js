const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT Create
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.status(201).json({ userId: user._id, token });
  } catch (err) {
    res.status(500).json({ msg: "Signup error", err });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = createToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (err) {
    res.status(500).json({ msg: "Login error", err });
  }
};
