const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  // Cuz we dropped everything inside test_helper.js, so we have to make sure
  // our fetchign test has something to return.
  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    // 就算未save 落DB，係尼一行，都已經有一個將要放入DB既 unique ID 係手。
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {

    // Each mongoose.model class has a find method. Return mutiple rows
    User.find({ name: 'Joe' })
      .then((users) => {
        // _id return objectId Type, so we needa toString()
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {

     // Each mongoose.model class has a find method. Return single rows
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done(); 
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});
