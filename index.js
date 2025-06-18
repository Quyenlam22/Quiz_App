const express = require('express');
require("dotenv").config();

const database = require("./back-end/config/database");
database.connect();

const app = express();
const port = 3002;

const route = require("./back-end/api/v1/routes/client/index");

route(app);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})