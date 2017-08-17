const mongoose = require('mongoose');

// global.Promise is a ES6 implementation of Promise.
// 如果唔寫，我地係尼個page 用once,on,drop尼D method 就會用返promise from mongo DB out of the box
mongoose.Promise = global.Promise;

// https://nodejs.org/api/events.html#events_class_events_eventemitter
// Once: Adds a one time listener for the event.
// This listener is invoked only the next time the event is fired, after which it is removed.
/*
Version 1
mongoose.connect('mongodb://localhost/users_test'); // users_test is db instance
mongoose.connection
  .once('open', () => { done(); })
  .on('error', (error) => {
    console.warn('Warning', error);
  });
*/

// Version 2
// If we don't wrap our method by using before(),
// our testing code maybe run before connect our DB
before((done) => { // Only run one time of our test

  // users_test is db instance, if no such intance exsisted, then create one
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// beforeEach is a hook before each tests in our tests
// Done is available in every single "it block" and beforeEach block when we use Moka
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  // Making any types of operation on DB is asynchronous in nature.
  // So... we need callback function!
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // Ready to run the next test!
        done();
      });
    });
  });
});
