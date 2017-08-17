const assert = require('assert');
const User = require('../src/user');

// For testing the post model.
describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  // Remember we can't has only one post!, we needa save the whole document (model).
  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      // ES6 systnax if we don't add a curly braces {} to arrow array.
      // It get an implicit return of whatever is inside of the arrow function.
      // .then(() => User.findOne({ name: 'Joe' })) is equal to
      // .then(() => { return User.findOne({ name: 'Joe' }) })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // Just like array push.
        user.posts.push({ title: 'New Post' });
        return user.save(); // return Promise()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // Using this method is way better then use slice and such methods...
        const post = user.posts[0];
        post.remove();
        return user.save(); 
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
