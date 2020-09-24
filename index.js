const express = require("express");

const { connect } = require("./config/database");
connect();

const app = express();

app.use(express.json());

app.listen(5001, () => {});
app.get("/", (req, res) => res.json({ message: "Hello World" }));

const data = {
  restaurants: [],
};

app.get("/api/v1/restaurants", (req, res) => {
  return res.json(data);
});

//To add data to the restaurant api
app.post("/api/v1/restaurants", (req, res) => {
  const { body } = req;
  body._id = data.restaurants.length + 1;
  data.restaurants.push(body);
  return res.json(data);
});

//To find a restaurant based on restaurant id
app.get("/api/v1/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = data.restaurants.find(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  return res.json(restaurant);
});

//To delete a restaurant based on an id
app.delete("/api/v1/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  data.restaurants.splice(index, 1);
  return res.json(data);
});

//To update a restaurant details
app.patch("/api/v1/restaurants/:restaurantId", (req, res) => {
  const { body } = req;
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  //body._id = restaurantId;
  data.restaurants[index].name = body.name;
  return res.json(data);
});
