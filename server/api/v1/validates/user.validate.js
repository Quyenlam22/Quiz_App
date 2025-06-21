module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Please re-enter password!"
    });
    return;
  }
  next();
}

module.exports.create = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Please re-enter full name!"
    });
    return;
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Please re-enter password!"
    });
    return;
  }
  next();
}

module.exports.forgotPassword = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  next();
}

module.exports.otpPassword = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  if (!req.body.otp) {
    res.json({
      code: 400,
      message: "Please re-enter otp!"
    });
    return;
  }
  next();
}

module.exports.resetPassword = (req, res, next) => {
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.json({
      code: 400,
      message: "Password does not match!"
    });
    return;
  }
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Please re-enter password!"
    });
    return;
  }
  if (!req.body.confirmPassword) {
    res.json({
      code: 400,
      message: "Please re-enter confirm password!"
    });
    return;
  }
  next();
}

module.exports.infoUser = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Please re-enter full name!"
    });
    return;
  }
  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Please re-enter email!"
    });
    return;
  }
  next();
}