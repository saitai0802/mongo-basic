const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the Artist that matches the id
 */
module.exports = (_id) => {

  // return Artist.findByOne({ _id: _id }); We don't needa do this, cuz we have a method for searching a object ID.

  // We don't needa handle Promise like Artist.findById(_id).then() as before!
  // Cuz some other part of the application will receive that query and resolve it in fashion.
  return Artist.findById(_id);  // Return a promise
};
