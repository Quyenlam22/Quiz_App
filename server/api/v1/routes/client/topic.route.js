const express = require('express');
const route = express.Router();

const controller = require('../../controller/topic.controller');

route.get('/', controller.index);

route.get('/:slug', controller.detail);

module.exports = route;