const express = require("express");
const app = express();
const auth = require("../auth");
const restaurantModel = require("../models/restaurant");
const baseURI = "/api/v1/restaurants";

//To get all restaurant details
app.get(baseURI, auth, async (req, res) => {
  const restaurants = await restaurantModel.find({});
  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//To add data to the restaurant api
app.post(baseURI, auth, async (req, res) => {
  const restaurant = new restaurantModel(req.body);
  try {
    await restaurant.save();
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

//To find a restaurant based on restaurant id
app.get(baseURI + "/:restaurantId", auth, async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).send("No restaurant found");
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

//To delete a restaurant based on an id
app.delete(baseURI + "/:restaurantId", auth, async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete(
      req.params.restaurantId
    );
    if (!restaurant) return res.status(404).send("No restaurant found");
    res.status(200).send("Deleted: " + restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

//To update a restaurant details based on Id
app.patch(baseURI + "/:restaurantId", auth, async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndUpdate(
      req.params.restaurantId,
      req.body
    );
    if (!restaurant) return res.status(404).send("No restaurant found");
    res.status(200).send("Updated restaurant.");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
