const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {

  // Don't do this approach! becuase we needa touch the DB twice to remove a record.
  // Artist.findById(_id)
  // .then((artist) => artist.remove());

  // Artist.remove({ _id: _id }); Non-ES6
  return Artist.remove({ _id }); //ES6 style, use it when id and value are identical.
};
