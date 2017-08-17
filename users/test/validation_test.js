const assert = require('assert');
const User = require('../src/user');

//  The valdation below is 100% provided by mongoose.
describe('Validating records', () => {

  // We don't use beforEach() here, because we wanna create a temp record without insert data in DB.

  it('requires a user name', () => {

    // we don't use {} to get the same error becuase writing the validate checking attribute is a lot clear
    const user = new User({ name: undefined });

    // validateSync() will return an object that to refer to as the validations result. (Every wrong validate will show up)
    // Using validate() we needa use callback function, using validateSync() we don't needa call back / Promise.
    // 要用validate - Asynchronize method 既機會多數都係要做 complicated stuff like checking user last name is unique or not.
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });

  // This is how we impliment the error handling part.
  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()  // <=== We know this Promise will not fall into then(), cuz this user record is no valid!
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });
});
