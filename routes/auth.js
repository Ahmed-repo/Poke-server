const authRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { loginValidation, registerValidation } = require("../validation");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email is already used");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  user.save();

  const token = jwt.sign({ user: user.email }, process.env.SECRET);
  res.header("Access-Control-Expose-Headers", "auth-token");
  res.header("auth-token", token);
  res.send({ user });
});

authRouter.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send("Wrong password");

  // res.send('Hello world')
  const token = jwt.sign({ user: user.email }, process.env.SECRET);
  res.header("Access-Control-Expose-Headers", "auth-token");
  res.header("auth-token", token);
  res.send({ user });
});

module.exports = authRouter;
