const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;  // It return a schema (姐係table 樣)

// for all validate related stuff, please check validation_test.js for more details!
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    // Web experts prefer, don't return error code like "schema_USERNAME_error"
    // it will make the job in front-end a lot easier, cuz you don't needa translate
    // to some English friendly equivalent.
    required: [true, 'Name is required.']  // [required is true, error message]
  },
  posts: [PostSchema], // Sub document
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// testing file is in virtual_type_test.js
// This is the way how we create a on the fire attribute for out model
// getter and setter is ES6 fetures!!!
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Check if mongo have a collection of 'user'?
// Then tell mongoose every time you work with User, the struture have to follow UserSchema.
// Return an user class represent the entire collection of data. (Not just a signle user!)
const User = mongoose.model('user', UserSchema);

// return a User class if some where require this file.
module.exports = User;
