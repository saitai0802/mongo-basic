const assert = require('assert'); // assertion, When we install Moka, we have installed this module
const User = require('../src/user');

// will you wanna try testing. Type npm run test
// check package.json for more detail
describe('Creating records', () => {

  // 1. it() is trying to run some type of test inside of this function.
  //    Moka will queen then up then run all the it() one at a time inside of every single function
  // 2. Done is available in every single "it block" and beforeEach block when we use Moka
  it('saves a user', (done) => {

    // This testing data won't save to our DB. Just exsist in memory
    const joe = new User({ name: 'Joe' });

    // Save user JOE record to DB
    // Save() return a promise, when the promise resolve (Which mean the record has saved to DB )
    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        // assertion, if you don't add this line, Moda will assume every test case is passed here.
        assert(!joe.isNew);
        done();
      });
  });
});
