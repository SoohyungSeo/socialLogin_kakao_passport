const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const routes = require('../routes');
const connect = require("../schema")
connect();
require("dotenv").config();

app.use(
    session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{secure:true}
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use("/", routes)

app.get("/", (_, res) => res.render("home"));

app.listen(3000, () => {
    console.log("3000 open!")
})