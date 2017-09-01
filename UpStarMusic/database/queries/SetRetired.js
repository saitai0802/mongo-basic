const Artist = require('../models/artist');

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */

 // We won't loop our id here, we will do our action in just one go!
module.exports = (_ids) => {
  return Artist.update(
    //Look at the _id of every artist, if their _id is IN _ids. Then we will update this item.
    { _id: { $in: _ids } },
    { retired: true },
    { multi: true }
  );
};
