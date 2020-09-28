const mongoose = require("mongoose");
require("dotenv").config();

const dbNames = {
  production: "sceats",
  test: "test-sceats",
  development: "dev-sceats",
};
const connect = () => {
  const mongoConnectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.lfmmd.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(mongoConnectionString, opts);
  mongoose.set("useFindAndModify", false);
};

module.exports = { connect };
