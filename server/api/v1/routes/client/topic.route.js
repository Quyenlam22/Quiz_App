const express = require('express');
const route = express.Router();

const controller = require('../../controller/topic.controller');

route.get('/', controller.index);

route.get('/:slug', controller.detail);

route.get('/info/:id', controller.infoTopic);

module.exports = route;