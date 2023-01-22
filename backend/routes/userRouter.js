import express from "express";
import User from "../models/userModal.js";
import userData from "../userData.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // console.log("userData ", userData)
    const createdUsers = await User.insertMany(userData.users);
    console.log("createdUsers ", createdUsers);
    res.send({ createdUsers });
  })
);

// Login Api
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    console.log("req.body.email ", req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res, next) => {
    const userEmailExist = await User.findOne({ email: req.body.email });

    if(userEmailExist){
      res
      .status(409).send({message: 'please use a different email id'})
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
  
      const createdUser = await user.save();
      res
        .status(200)
        .send({
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          isAdmin: createdUser.isAdmin,
          token: generateToken(createdUser),
        });
    }
   
  })
);

export default userRouter;
