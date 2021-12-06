// app.js
// Imports
const express = require("express");
const app = express();
const hbs = require("hbs");

require("dotenv/config");

const path = require("path");

require("./db");

const sessionManager = require("./config/session");

// Middlewares
// Static files - HTML CSS JS IMAGES
app.use(express.static(path.join(__dirname, "public")));

// View
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");
// To use req.body
app.use(express.urlencoded({ extended: true }));

// Conect to Db
// connectDB();

// Sessions
sessionManager(app);

// Layout Middleware
// Importante para saber si un usrio esta loggeado y checar en las vistas
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// Routes
// Home
app.use("/", require("./routes"));

// // Login y signup y Logout
app.use("/auth", require("./routes/auth.router"));

// Users
app.use("/user", require("./routes/user.router"));

// // Rooms
app.use("/nfts", require("./routes/nfts.router"));

// Export
module.exports = app;
