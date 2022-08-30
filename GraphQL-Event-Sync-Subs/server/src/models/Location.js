const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const LocationSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
