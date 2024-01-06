import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please provide all value!" });
  }

  const userAlreadyExists = await User.findOne({ username });
  if (userAlreadyExists) {
    return res.status(400).json({ msg: "username already in use!" });
  }

  const salt = bcrypt.genSaltSync(10);

  const user = await User.create({
    username,
    password: bcrypt.hashSync(password, salt),
  });
  res.status(200).json({
    user: {
      username: user.username,
    },
  });
};


const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please provide all value!" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Not found your account!" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Password is not correct!" });
  }

  res.status(200).json({
    user: {
      username: user.username,
    },
  });
};

export { register, login };
