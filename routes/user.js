const userRouter = require("express").Router();
const verify = require("./verify");
const User = require("../models/User");
userRouter.get("/", verify, (req, res) => {
  res.send(req.user);
});

userRouter.get("/me", verify, async (req, res) => {
  try {
    console.log("req.user", req.user);
    const user = await User.find({ email: req.user.user });

    res.send({
      user,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      error,
    });
  }
});

module.exports = userRouter;
