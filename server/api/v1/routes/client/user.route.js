const express = require('express');
const route = express.Router();

const controller = require('../../controller/user.controller');
const validate = require("../../validates/user.validate");

route.post('/login', validate.login, controller.login);

route.post('/create', validate.create, controller.create);

route.get('/info/:id', controller.info);

route.post('/password/forgot', validate.forgotPassword, controller.forgotPassword);

route.post('/password/otp', validate.otpPassword, controller.otpPassword);

route.post('/password/reset', validate.resetPassword, controller.resetPassword);

route.patch('/info', validate.infoUser, controller.infoUser);

module.exports = route;