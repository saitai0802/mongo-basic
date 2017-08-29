const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    // Mongoose will automatically add a blogPost object it to Joe's list.
    joe.blogPosts.push(blogPost); // Has many relationship
    blogPost.comments.push(comment); // Has many relationship
    comment.user = joe; // Has one relationship

    // We needa add a done() function, but can't add it into any three of them separately
    // So we will use ES6 navtive function Promise.all(); these 3 requests occurs in parallel.
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  //it.only('saves a relation between a user and a blogpost', (done) => {  Only run this test
  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')  // It has to be the same name as UserSchema inside const UserSchema = new Schema({..});
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts', // inside of the User(Joe) that we fetch, we wanna recursively load this additional resource(blogPosts).
        populate: { // Insde the blogPosts object, we will go further inside and load more additional associations.
          path: 'comments',
          model: 'comment',  // It needs the same as ref: 'comment' in blogPost.js
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });
});
