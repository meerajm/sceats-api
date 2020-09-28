const express = require("express");
const restaurantRouter = require("./routes/restaurantRoutes");
const { connect } = require("./config/database");
connect();
const app = express();

app.use(express.json());
app.use(restaurantRouter);

app.listen(5001, () => {
  console.log("Application running in localhost: 5001");
});

require("dotenv").config();
//Create an object to have your username and password
const user = { username: process.env.UNAME, password: process.env.PWD };
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const accessTokenSecret = "youraccesstokensecret";

//To login
app.post("/login", (req, res) => {
  //Read username and password from request body
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const accessToken = jwt.sign(
      { username: user.username },
      accessTokenSecret,
      { expiresIn: "24h" } //Access token is valid for one day
    );
    res.json({ accessToken });
  } else {
    res.send("Username or password is incorrect");
  }
});
