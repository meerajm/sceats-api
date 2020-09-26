const express = require("express");
const app = express();
const auth = require("../auth");

const data = {
  restaurants: [],
};

const baseURI = "/api/v1/restaurants";
app.get("/", (req, res) => res.json({ message: "Hello World" }));

//To get all restaurant details
app.get(baseURI, (req, res) => {
  return res.json(data);
});

//To add data to the restaurant api
app.post(baseURI, auth, (req, res) => {
  const { body } = req;
  body._id = data.restaurants.length + 1; //Change
  data.restaurants.push(body);
  return res.json(data);
});

//To find a restaurant based on restaurant id
app.get(baseURI + "/:restaurantId", auth, (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = data.restaurants.find(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  return res.json(restaurant);
});

//To delete a restaurant based on an id
app.delete(baseURI + "/:restaurantId", auth, (req, res) => {
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  data.restaurants.splice(index, 1);
  return res.json(data);
});

//To update a restaurant details based on Id
app.patch(baseURI + "/:restaurantId", auth, (req, res) => {
  const { body } = req;
  const { restaurantId } = req.params;
  const index = data.restaurants.findIndex(
    (aRestaurant) => aRestaurant._id === +restaurantId
  );
  data.restaurants[index].name = body.name;
  return res.json(data);
});

module.exports = app;
