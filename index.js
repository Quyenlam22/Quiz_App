const express = require('express');
require("dotenv").config();

const bodyParser = require('body-parser');

const database = require("./back-end/config/database");
database.connect();

const app = express();
const port = 3002;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const route = require("./back-end/api/v1/routes/client/index");

route(app);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})