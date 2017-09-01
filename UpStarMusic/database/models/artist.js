const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({

  // https://stackoverflow.com/questions/40806871/full-text-search-in-node-js-with-mongoose
  // We must specify a field that will be indexed as a text field.
  // or else it will response something like <<<text index required for $text query>>> !
  // (Mongo currently only supports an index on a single field!)
  //name: {type: [String], text: true},


  name: String,
  age: Number,  // Poor choice, cuz you needa increase one every year.
  yearsActive: Number, // How many year artist working in music industry
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String, // Company or manager name
  retired: Boolean,
  albums: [AlbumSchema]
});

// When we have a schema represent a collection, we need to turn this into a model.
const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
