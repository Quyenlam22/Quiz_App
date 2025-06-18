const topicRoute = require("./topic.route");
const answerRoute = require("./answer.route");

module.exports = (app) => {
  const version = `/api/v1`;

  app.use(`${version}/topics`, topicRoute);
  app.use(`${version}/answers`, answerRoute);
}