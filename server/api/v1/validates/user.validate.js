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