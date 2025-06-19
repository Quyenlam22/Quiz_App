const topicRoute = require("./topic.route");
const answerRoute = require("./answer.route");
const questionRoute = require("./question.route");
const userRoute = require("./user.route");

module.exports = (app) => {
  const version = `/api/v1`;

  app.use(`${version}/topics`, topicRoute);
  app.use(`${version}/answers`, answerRoute);
  app.use(`${version}/questions`, questionRoute);
  app.use(`${version}/users`, userRoute);
}