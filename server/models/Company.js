const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
  },
  inn: {
    type: String,
  },
  ogrn: {
    type: String,
  },
});

module.exports = model("Company", schema);
