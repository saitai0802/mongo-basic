const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {

  const minQuery = Artist
    .find({})
    .sort({ yearsActive: 1 })
    .limit(1) // We have to limit the DB server only return a single record to our Node.js server! [Or use findOne()]
    .then(artists => artists[0].yearsActive);  // return minAge

  const maxQuery = Artist
    .find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then(artists => artists[0].yearsActive);

  return Promise.all([minQuery, maxQuery])
    .then((result) => {
      return { min: result[0], max: result[1] };
    });
};

/*
If someone wanna call this function...
  GetAgeRange()
  .then((argument) => {
    console.log(argument)
  })
*/
