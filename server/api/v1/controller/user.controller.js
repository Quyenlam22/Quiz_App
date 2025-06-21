const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");
const ForgotPassword = require("../models/forgot-password.model");
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
    const user = await User.findOne(options).select("-password");

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
    }).select("-password");

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
        token: generateHelper.generateRandomString(30),
        role: req.body.role,
      }
      const record = new User(options);
      await record.save();

      const userObject = record.toObject();
      delete userObject.password;
      res.json({
        code: 200,
        record: userObject
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}
//PASSWORD








// [GET] /api/v1/users/info/:id
module.exports.info = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      _id: id,
      // role: req.body.role
    }).select("-password");

    if (user) {
      res.json({
        code: 200,
        data: user
      });
    } else {
      res.json({
        code: 400,
        message: 'Not found user!'
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      role: req.body.role,
      deleted: false
    }).select('-password');

    if (user) {
      const otp = generateHelper.generateRandomNumber(6)
      const options = {
        email: req.body.email,
        otp: otp,
        expireAt: Date.now()
      };

      const forgotPassword = new ForgotPassword(options);
      await forgotPassword.save();

      const subject = "Mã OTP xác minh lấy lại mật khẩu";
      const html = `Mã OTP xác minh của bạn là: <b>${otp}</b>. Thời hạn sử dụng là 3 phút!`;
      sendMailHelper.sendMail(req.body.email, subject, html);

      res.json({
        code: 200,
        data: forgotPassword
      });
    } else {
      res.json({
        code: 400,
        message: 'Not found user!'
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  try {
    const data = await ForgotPassword.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });

    if (data) {
      res.json({
        code: 200,
        data: data
      });
    } else {
      res.json({
        code: 400,
        message: 'OTP is not correct!'
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const data = await User.updateOne({
      email: email,
    }, {
      password: md5(password)
    });
    res.json({
      code: 200,
      data: data
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}

// [PATCH] /api/v1/users/info
module.exports.infoUser = async (req, res) => {
  const id = req.body.id;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  try {
    const emailExist = await User.findOne({
      _id: {
        $ne: id
      },
      email: email,
      role: role
    });
    if (emailExist) {
      res.json({
        code: 400,
        message: "Email already exists in the system!"
      });
    } else {
      const user = await User.findOne({
        _id: id
      })
      if (user) {
        const data = await User.updateOne({
          _id: id,
        }, {
          fullName: fullName,
          email: email,
          password: password ? md5(password) : user.password
        });
        res.json({
          code: 200,
          data: data
        });
      } else {
        res.json({
          code: 400,
          message: "Not found User!"
        });
      }
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    });
  }
}