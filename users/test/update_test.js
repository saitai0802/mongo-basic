const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  // Create a testing user Joe for this test case
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  // Out common testing function to check if a Joe has been updated.
  // Check only one Alex here, since Joe has been change his name to Alex.
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  // *************Updating Option 1 - set() & save() from Model Insance******************
  // Update records using set() and save().
  it('instance type using set n save', (done) => {
    // console.log(joe)
    // { __v: 0,  name: 'Joe',  likes: 0,  _id: 59953aa3cd574603bcb58ea4,  blogPosts: [],  posts: [] }
    joe.set('name', 'Alex');  // This will update is just in our memory.
    assertName(joe.save(), done);
  });

  //*************Updating Option 2 - update() from Model Insance******************
  // Update records using update().
  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  //*************Updating Option 3 - findOneAndUpdate() from Model Class******************
  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  //*************Updating Option 4- findByIdAndUpdate() from Model Class******************
  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });


  //*************Updating Option 5- findByIdAndUpdate() from Model Class**********
  it('A user can have their postcount incremented by 1', (done) => {

    // 如果禁寫就會變左每次update 都set likes to 1, we should use Mongo Update Operators.
    // User.update({ name: 'Joe' }, { likes: 10 }), done);

    // Mongo Update Operators - https://docs.mongodb.com/manual/reference/operator/update/
    // $set, unset, $min, $max, $inc....
    // Using Mongo update operator is way better than grabbing an entire record, then update some records
    // then send all records back again. 可以一次update 哂所有要做既records
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })  // $inc: increase one!
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
