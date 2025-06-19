const generate = require("../../../helpers/generate");
const User = require("../models/user.model");
const md5 = require("md5");

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  try {
    const options = {
      email: req.body.email,
      password: md5(req.body.password),
      role: req.body.role,
      deleted: false
    }
    const user = await User.findOne(options);

    if (user) {
      res.json({
        code: 200,
        user: user
      });
    } else {
      res.json({
        code: 400,
        message: "Not found account!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [POST] /api/v1/users/create
module.exports.create = async (req, res) => {
  try {
    const userExist = await User.findOne({
      email: req.body.email,
      role: req.body.role
    });

    if (userExist) {
      res.json({
        code: 400,
        message: 'User already exists in the system!'
      });
    } else {
      const options = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generate.generateRandomString(30),
        role: req.body.role,
      }
      const record = new User(options);
      await record.save();
      res.json({
        code: 200,
        record: record
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}