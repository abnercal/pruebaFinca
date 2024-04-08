const express = require("express");
const app = express();
const messageCTR = require("../controllers/message");
var middle = require('../middlewares/authenticate')


app.post("/", middle.aunthenticate, messageCTR.messagePost);
app.get("/findID/:id", middle.aunthenticate, messageCTR.messageGetId);
app.get('/', middle.aunthenticate, messageCTR.messageGet)
app.get("/:tag",middle.aunthenticate, messageCTR.messageGetTags);
module.exports = app;
