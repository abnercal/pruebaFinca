const express = require("express");
const app = express();
const credentialCTR = require("../controllers/credentials");

app.put("/", credentialCTR.credentialPut);

module.exports = app;
