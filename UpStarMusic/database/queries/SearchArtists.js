const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this: { all: [artists], count: count, offset: offset, limit: limit }
 */
 // sortProperty = sort by dropdown: name/age/yearActive
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

  console.log(buildQuery(criteria))
  // Do the normal query
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })  // [key] <=== this is a ES6 sytnax for dynamic key name (interpolated key)
    .skip(offset)
    .limit(limit);

  // Q: Can we do save the reference of  Artist.find(buildQuery(criteria)) then  count() then do the sort(),skip()?
  // A: The answer is no! Have to do it in seperated 2 querys!!! This is mongoDB design.
  return Promise.all([query, Artist.find(buildQuery(criteria)).count()])   // Promise is for finding count.(Asynchronous operation)
    .then((results) => {
      return {
        all: results[0],  // First query - All records query
        count: results[1],  // Second query - count query
        offset: offset,
        limit: limit
      };
    });
};

// https://docs.mongodb.com/manual/reference/operator/query/
const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    // https://docs.mongodb.com/manual/reference/operator/query/text/#op._S_text
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
};
