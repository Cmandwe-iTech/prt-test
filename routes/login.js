const express = require("express");
const reg_router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
reg_router.use(bodyparser.json());

reg_router.post("/register", async (req, res) => {
  try {
    const isAvailable = await UserModel.findOne({ email: req.body.email });
    if (isAvailable) {
      res.json({
        status: "failed",
        message: "user already exist",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        if (!err) {
          try {
            const user = await UserModel.create({
              email: req.body.email,
              password: hash,
            });
            res.status(200).json({
              status: "registered successfully",
              user,
            });
          } catch (e) {
            res.json({
              message: e.message,
            });
          }
        }
      });
    }
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

reg_router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        let result = bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: user._id,
            },
            "secret"
          );
          res.status(200).json({
            status: "ok",
            token,
          });
        } else {
          res.status(400).json({
            status: "failed",
            message: "password does not match",
          });
        }
    }else{
      res.status(404).json({
        status:"user does not exist"
      })
    }
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

module.exports = reg_router;
