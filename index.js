const express = require('express');
require("dotenv").config();

const database = require("./back-end/config/database");
database.connect();

const app = express();
const port = process.env.PORT;

app.get(`/api/v1/`, async (req, res) => {
  res.json({
    code: 200,
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})