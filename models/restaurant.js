const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
