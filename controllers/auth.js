const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");

const { ctrlWrapper, HttpError, resizeAvatar } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "250", d: "mp" }, false);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!user) {
    throw HttpError(401);
  }
  res.json({ email, subscription });
};

const changeAvatar = async (req, res) => {
  const { _id } = req.user;

  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsDir, filename);

  resizeAvatar(tempUpload, resultUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("avatars", filename);
  console.log(tempUpload);

  const user = await User.findByIdAndUpdate(_id, { avatarURL: avatar });
  if (!user) {
    throw HttpError(401);
  }
  res.json({
    avatarURL: avatar,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
};
