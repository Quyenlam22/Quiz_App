const express = require('express');
const route = express.Router();

const controller = require('../../controller/user.controller');
const validate = require("../../validates/user.validate");

route.post('/login', validate.login, controller.login);

route.post('/create', validate.create, controller.create);

module.exports = route;