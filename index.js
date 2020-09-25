const express = require("express");

const { connect } = require("./config/database");
connect();

const app = express();

app.use(express.json());

app.listen(5001, () => {});

const user = { username: "meera", password: "pwd1234" };

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const accessTokenSecret="youraccesstokensecret";


//To login
app.post("/login",(req,res)=>{
  //Read username and password from request body
  const {username,password}=req.body;
  if(username===user.username && password===user.password){
const accessToken=jwt.sign({username:user.username},accessTokenSecret,{ expiresIn: '24h' });
res.json({accessToken});
  }
  else{
    res.send("Username or password is incorrect");
  }
});

//Authenticate the JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const data = {
    restaurants: [],
  };

app.get("/", (req, res) => res.json({ message: "Hello World" }));

//To get all restaurant details
app.get("/api/v1/restaurants", (req, res) => {
  return res.json(data);
});

//To add data to the restaurant api
app.post("/api/v1/restaurants", authenticateJWT, (req, res) => {
  const { body } = req;
  body._id = data.restaurants.length + 1;
  data.restaurants.push(body);
  return res.json(data);
});

//To find a restaurant based on restaurant id
app.get("/api/v1/restaurants/:restaurantId", authenticateJWT,(req, res) => {
  const { restaurantId } = req.params;
  const restaurant = data.restaurants.find(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  return res.json(restaurant);
});

//To delete a restaurant based on an id
app.delete("/api/v1/restaurants/:restaurantId", authenticateJWT, (req, res) => {
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  data.restaurants.splice(index, 1);
  return res.json(data);
});

//To update a restaurant details based on Id
app.patch("/api/v1/restaurants/:restaurantId", authenticateJWT, (req, res) => {
  const { body } = req;
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  data.restaurants[index].name = body.name;
  return res.json(data);
});

