const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/error");
const routes = require("./routes");
const pkg = require("./package.json");

const { port, mongoUrl, secret } = config;
const app = express();

// Conectar aplicación a MongoDB
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) {
      return err;
    }
    console.log("conectado con Mongo");
  }
);

app.set("config", config);
app.set("pkg", pkg);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware(secret));

const { Burgers } = require("./models/Burgers.js");
// Registrar rutas
app.get("/Burgers", (req, res) => {
  Burgers.find({}, (err, Burgers) => {
    res.send(Burgers);
  });
});

app.post("/Burgers/new", (req, res) => {
  const newBurgers = new Burgers(req.body);
  console.log(newBurgers);
  newBurgers.save((err, dataLoaded) => {
    if (err) {
      return err;
    }
    res.send(dataLoaded);
  });
});

// routes(app, err => {
//   if (err) {
//     throw err;
//   }
// });

// Registro de "middleware" que maneja posibles errores
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}`));
