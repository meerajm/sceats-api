const mongoose = require("mongoose");

const dbNames = {
  production: "sceats",
  test: "test-sceats",
  development: "dev-sceats",
};
const connect = () => {
  const mongoConnectionString = `mongodb+srv://<username>:<password>@cluster0.lfmmd.mongodb.net/<dbName>?retryWrites=true&w=majority`;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(mongoConnectionString, opts);
  mongoose.set("useFindAndModify", false);
};

module.exports = { connect };
