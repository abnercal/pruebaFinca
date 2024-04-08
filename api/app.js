const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express()
const port = 3002;

//CORS 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, X-Key, X-Route, X-Signature');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json());
//app.use(bodyParser.json());

//rutas
const credentialRoutes = require("./routes/credential");
const messageRoutes = require("./routes/message");
app.use('/credential',credentialRoutes);
app.use('/message',messageRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
      status: true,
      message: 'Petición realizada correctamente'
  });
});

// Escucha de Peticiones
app.listen(port, () => {
    console.log(`Express server corriendo en puerto ${port}: \x1b[32m%s\x1b[0m`, 'online');
});