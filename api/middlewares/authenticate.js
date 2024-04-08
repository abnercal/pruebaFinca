const CryptoJS = require("crypto-js");

exports.aunthenticate = function (req, res, next) {
  // Get headers
  var xKey = req.headers["x-key"];
  var xRoute = req.headers["x-route"];
  var xSignature = req.headers["x-signature"];

  var cadena = "[{key:" + xKey + ",X-Route:" + xRoute + "}]";

  var credentials = JSON.parse(localStorage.getItem("credentials"));
  let searchCredential = credentials.find((e) => e.key == xKey);

  if (searchCredential) {
    var shared_secret = searchCredential.shared_secret;
    var hash = CryptoJS.HmacSHA256(cadena, shared_secret).toString(
      CryptoJS.enc.Hex
    );
    next();
  } else {
    return res.status(403).json({
      ok: false,
      message: "Ingresa Credenciales Validas",
    });
  }
};
