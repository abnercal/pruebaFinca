const express = require("express");
const app = express();
const messageCTR = require("../controllers/message");

app.get("/:tag", messageCTR.messageGetTags);

/* app.get('/', function (req, res) {
    res.send('Hello message')
  }) */

module.exports = app;
