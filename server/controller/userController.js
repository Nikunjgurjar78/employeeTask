const User = require("../model/userModel");
const Auth = require("../model/authModel");

//  Crteate    User
const createUser = async (req, res) => {
  const { name, email, phone, department, status } = req.body;

  if (!name || !email || !phone || !department || !status) {
    res.status(400);
    throw new Error("Fill all details");
  }

  const user = await User.create({ name, email, phone, department, status });

  if (!user) {
    res.status(404);
    throw new Error("User not created");
  }
  res.status(200).json(user);
};

// All User
const getAlldata = async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400);
    throw new Error("bad req");
  }
  res.status(200).json(users);
};

const updateDetails = async (req, res) => {
  const { name, email, phone, department, status } = req.body;

  if (!name || !email || !phone || !department || !status) {
    res.status(400);
    throw new Error("fill all details");
  }

  //user exist
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    phone,
    department,
    status,
  });

  res.status(200).json(updatedUser);
};

// delete employe
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({ id: req.params.id, msg: "User deleted" });
};



module.exports = { createUser, updateDetails, getAlldata, deleteUser };
